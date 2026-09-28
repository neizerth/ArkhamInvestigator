import { getSignatureImageUrl } from "../getSignatureImageUrl";

jest.mock("expo-file-system/legacy", () =>
	require("@shared/lib/test/mocks").fileSystemMock(),
);
jest.mock("@shared/config", () => ({
	ASSET_URL: "https://cdn.test",
	HAVE_AVIF_SUPPORT: false,
}));

describe("getSignatureImageUrl", () => {
	const base = { code: "01001", type: "square" as const };

	it("defaults to a path inside the document directory", () => {
		expect(getSignatureImageUrl(base)).toBe(
			"file:///docs/images/webp/square/01001.webp",
		);
	});

	it("builds the remote url", () => {
		expect(getSignatureImageUrl({ ...base, pathType: "absolute" })).toBe(
			"https://cdn.test/images/webp/square/01001.webp",
		);
		expect(
			getSignatureImageUrl({
				...base,
				pathType: "absolute",
				baseUrl: "http://h",
			}),
		).toBe("http://h/images/webp/square/01001.webp");
	});

	it("builds the relative path", () => {
		expect(getSignatureImageUrl({ ...base, pathType: "relative" })).toBe(
			"images/webp/square/01001.webp",
		);
	});

	it("adds the grayscale folder", () => {
		expect(
			getSignatureImageUrl({
				...base,
				type: "full",
				grayscale: true,
				pathType: "relative",
			}),
		).toBe("images/webp/full/grayscale/01001.webp");
	});
});
