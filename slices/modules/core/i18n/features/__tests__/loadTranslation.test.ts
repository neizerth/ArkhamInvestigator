import { createSagaTester } from "../../../../../shared/lib/test/createSagaTester";
import { setTranslation } from "../../entities/translation/setTranslation";
import {
	loadLanguage,
	loadLanguageFailed,
	setLanguage,
} from "../../shared/lib";
import { loadTranslationSaga } from "../load-translation/loadTranslationSaga";

const mockGet = jest.fn();

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);
jest.mock("../../shared/lib", () => ({
	...jest.requireActual("../../shared/lib/store"),
	...jest.requireActual("../../shared/lib/common"),
}));

jest.mock("@shared/api", () => ({
	translationAPI: { get: (path: string) => mockGet(path) },
}));
jest.mock("@shared/config/app", () => ({ BUILD_VERSION: "1" }));
jest.mock("@modules/core/i18n/shared/lib/common/StoreTranslation", () => ({
	StoreTranslation: { save: jest.fn(), load: jest.fn() },
}));

beforeEach(() => {
	jest.useFakeTimers();
	mockGet.mockReset();
});

afterEach(() => {
	jest.useRealTimers();
});

describe("loadTranslationSaga", () => {
	it("reports a failure after all retries and keeps handling later requests", async () => {
		const tester = createSagaTester();
		tester.run(loadTranslationSaga);

		mockGet.mockRejectedValue(new Error("offline"));
		tester.dispatch(loadLanguage("ru"));
		await jest.advanceTimersByTimeAsync(10_000);

		expect(mockGet).toHaveBeenCalledTimes(5);
		expect(tester.ofType(loadLanguageFailed.type)).toEqual([
			loadLanguageFailed("ru"),
		]);
		expect(tester.ofType(setLanguage.type)).toEqual([]);

		// the watcher survived the error
		mockGet.mockResolvedValue({ data: { common: { hello: "Hallo" } } });
		tester.dispatch(loadLanguage("de"));
		await jest.advanceTimersByTimeAsync(0);

		expect(tester.ofType(setTranslation.type)).toHaveLength(1);
		expect(tester.ofType(setLanguage.type)).toEqual([setLanguage("de")]);
	});
});
