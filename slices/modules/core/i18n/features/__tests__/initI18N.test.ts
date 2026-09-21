import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "../../../../../shared/lib/test/createSagaTester";
import {
	restoreTranslation,
	translationRestored,
} from "../../entities/translation/restoreTranslation/restoreTranslation";
import { setLanguage } from "../../shared/lib";
import i18n from "../../shared/lib/store/i18n";
import { initI18N } from "../init-i18n/initI18N";

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);
jest.mock("@modules/core/i18n/shared/lib/common/StoreTranslation", () => ({
	StoreTranslation: { load: jest.fn(), save: jest.fn() },
}));
jest.mock("../../shared/lib", () => ({
	...jest.requireActual("../../shared/lib/store"),
	...jest.requireActual("../../shared/lib/common"),
}));

const reducer = combineReducers({ i18n });

const setup = (language: string | null) => {
	const tester = createSagaTester({ reducer });
	if (language) {
		tester.dispatch(setLanguage(language));
	}
	let done = false;
	tester
		.run(initI18N)
		.toPromise()
		.then(() => {
			done = true;
		});
	return { tester, isDone: () => done };
};

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.useRealTimers();
});

describe("initI18N", () => {
	it("waits until the selected language is restored", async () => {
		const { tester, isDone } = setup("ru");
		await jest.advanceTimersByTimeAsync(0);

		expect(tester.ofType(restoreTranslation.type)).toEqual([
			restoreTranslation("ru"),
		]);
		expect(isDone()).toBe(false);

		// another language restored meanwhile is not ours
		tester.dispatch(translationRestored("de"));
		await jest.advanceTimersByTimeAsync(0);
		expect(isDone()).toBe(false);

		tester.dispatch(translationRestored("ru"));
		await jest.advanceTimersByTimeAsync(0);
		expect(isDone()).toBe(true);
	});

	it("stops waiting after the timeout", async () => {
		const { isDone } = setup("ru");

		await jest.advanceTimersByTimeAsync(4_999);
		expect(isDone()).toBe(false);

		await jest.advanceTimersByTimeAsync(1);
		expect(isDone()).toBe(true);
	});

	it("finishes at once without a selected language", async () => {
		const { tester, isDone } = setup(null);
		await jest.advanceTimersByTimeAsync(0);

		expect(tester.ofType(restoreTranslation.type)).toEqual([]);
		expect(isDone()).toBe(true);
	});
});
