import {
	createSagaTester,
	flush,
} from "../../../../../shared/lib/test/createSagaTester";
import {
	loadLanguage,
	loadLanguageFailed,
	setLanguage,
} from "../../shared/lib";
import {
	restoreTranslation,
	translationRestored,
} from "../translation/restoreTranslation/restoreTranslation";
import { restoreTranslationsSaga } from "../translation/restoreTranslation/restoreTranslationsSaga";
import { setTranslation } from "../translation/setTranslation";

const mockLoad = jest.fn();

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);
jest.mock("../../shared/lib", () => ({
	...jest.requireActual("../../shared/lib/store"),
	...jest.requireActual("../../shared/lib/common"),
}));
jest.mock("@modules/core/i18n/shared/lib/common/StoreTranslation", () => ({
	StoreTranslation: { load: (language: string) => mockLoad(language) },
}));

const setup = () => {
	const tester = createSagaTester();
	tester.run(restoreTranslationsSaga);
	return tester;
};

beforeEach(() => {
	mockLoad.mockReset();
});

describe("restoreTranslation", () => {
	it("restores a translation stored on disk", async () => {
		mockLoad.mockResolvedValue({ hello: "Привет" });
		const tester = setup();

		tester.dispatch(restoreTranslation("ru"));
		await flush();

		expect(tester.ofType(setTranslation.type)).toHaveLength(1);
		expect(tester.ofType(translationRestored.type)).toEqual([
			translationRestored("ru"),
		]);
	});

	it("downloads a missing translation", async () => {
		mockLoad.mockResolvedValue(undefined);
		const tester = setup();

		tester.dispatch(restoreTranslation("ru"));
		await flush();

		expect(tester.ofType(loadLanguage.type)).toEqual([loadLanguage("ru")]);

		tester.dispatch(setLanguage("ru"));
		await flush();

		expect(tester.ofType(translationRestored.type)).toEqual([
			translationRestored("ru"),
		]);
	});

	it("gives up when the download fails", async () => {
		mockLoad.mockResolvedValue(undefined);
		const tester = setup();

		tester.dispatch(restoreTranslation("ru"));
		await flush();
		tester.dispatch(loadLanguageFailed("ru"));
		await flush();

		// a later unrelated language change must not be taken as the result
		tester.dispatch(setLanguage("de"));
		await flush();

		expect(tester.ofType(translationRestored.type)).toEqual([]);
	});

	it("ignores an empty language", async () => {
		const tester = setup();

		tester.dispatch(restoreTranslation(null));
		await flush();

		expect(mockLoad).not.toHaveBeenCalled();
		expect(tester.ofType(translationRestored.type)).toEqual([]);
	});
});
