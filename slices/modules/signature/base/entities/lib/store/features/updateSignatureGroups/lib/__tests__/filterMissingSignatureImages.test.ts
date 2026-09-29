import * as FileSystem from "expo-file-system";
import { filterMissingSignatureImages } from "../filterMissingSignatureImages";

jest.mock("expo-file-system", () =>
	require("@shared/lib/test/mocks").fileSystemMock(),
);
jest.mock("@shared/config", () => ({
	ASSET_URL: "https://cdn.test",
	HAVE_AVIF_SUPPORT: false,
}));

const getInfo = FileSystem.getInfoAsync as jest.Mock;

describe("filterMissingSignatureImages", () => {
	it("keeps only the files absent from disk", async () => {
		getInfo.mockImplementation(async (uri: string) => ({
			exists: uri.endsWith("/square/a.webp"),
		}));
		const files = [
			{ code: "a", type: "square" as const },
			{ code: "a", type: "full" as const },
		];

		await expect(filterMissingSignatureImages(files)).resolves.toEqual([
			{ code: "a", type: "full" },
		]);
		expect(getInfo).toHaveBeenCalledWith(
			"file:///docs/images/webp/full/a.webp",
		);
	});

	it("returns nothing for an empty list", async () => {
		await expect(filterMissingSignatureImages([])).resolves.toEqual([]);
	});
});
