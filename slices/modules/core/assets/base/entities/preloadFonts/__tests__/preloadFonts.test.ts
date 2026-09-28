import { setFontsLoaded } from "@modules/core/assets/base/shared/lib";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { preloadFonts } from "../preloadFonts";

jest.mock("@shared/lib", () => ({
	...require("@shared/lib/test/mocks").sharedLibMock(),
	seconds: (n: number) => n * 1000,
}));
jest.mock("@modules/core/log/shared/config", () => ({
	log: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

const mockPreloadFontMap = jest.fn();
jest.mock("../preloadFontMap", () => ({
	preloadFontMap: () => mockPreloadFontMap(),
}));

beforeEach(() => {
	jest.useFakeTimers();
	mockPreloadFontMap.mockReset();
});

afterEach(() => {
	jest.useRealTimers();
});

describe("preloadFonts", () => {
	it("sets fontsLoaded once the font map resolves normally", async () => {
		mockPreloadFontMap.mockResolvedValue(undefined);
		const tester = createSagaTester();

		tester.run(preloadFonts);
		await jest.advanceTimersByTimeAsync(0);

		expect(tester.ofType(setFontsLoaded.type)).toHaveLength(1);
	});

	/**
	 * Regression test: the whole app-load chain (appLoadSaga) awaits this generator before ever
	 * dispatching setAppLoaded, so a font load that never resolves used to leave the loader
	 * spinning forever with no way out — the exact "bare iPhone hangs on the logo" symptom. A
	 * 3s timeout now forces progress regardless.
	 */
	it("still sets fontsLoaded after the timeout when the font map never resolves (does not hang the loader forever)", async () => {
		mockPreloadFontMap.mockReturnValue(new Promise(() => {})); // never resolves
		const tester = createSagaTester();

		tester.run(preloadFonts);

		await jest.advanceTimersByTimeAsync(2_000);
		expect(tester.ofType(setFontsLoaded.type)).toHaveLength(0);

		await jest.advanceTimersByTimeAsync(1_001);
		expect(tester.ofType(setFontsLoaded.type)).toHaveLength(1);
	});
});
