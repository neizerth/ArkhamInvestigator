import { getSignatureImageLayout } from "@modules/signature/base/shared/lib";
import * as FileSystem from "expo-file-system/legacy";
import { validateImageCache } from "../validateImageCache";

jest.mock("expo-file-system/legacy", () =>
	require("@shared/lib/test/mocks").fileSystemMock(),
);
jest.mock("@modules/signature/base/shared/lib", () => ({
	getSignatureImageLayout: jest.fn(),
}));

const getInfo = FileSystem.getInfoAsync as jest.Mock;
const layoutOf = getSignatureImageLayout as jest.Mock;

const image = { id: "a", version: 1, width: 100.2, height: 50.4 } as never;
const crop = { left: 1, top: 2, width: 3, height: 4 };
const offset = { left: 5, top: 6, right: 7, bottom: 8 };
const view = { width: 10, height: 10 };

const cache = {
	id: "1",
	image,
	type: "square",
	code: "a",
	grayscale: false,
	src: "s",
	uri: "file:///cache/a.webp",
	crop,
	offset,
} as never;

const data = { image, offset, view };

beforeEach(() => {
	jest.clearAllMocks();
	getInfo.mockResolvedValue({ exists: true });
	layoutOf.mockReturnValue({ crop, scale: 1, faceHeightPercent: 1 });
});

describe("validateImageCache", () => {
	it("accepts an untouched cache", async () => {
		await expect(validateImageCache({ cache, data })).resolves.toBe(true);
		expect(getInfo).toHaveBeenCalledWith("file:///cache/a.webp");
	});

	it("rejects when there is no cache", async () => {
		await expect(validateImageCache({ data })).resolves.toBe(false);
		expect(getInfo).not.toHaveBeenCalled();
	});

	it("rejects when the cached file is gone", async () => {
		getInfo.mockResolvedValue({ exists: false });

		await expect(validateImageCache({ cache, data })).resolves.toBe(false);
	});

	it("rejects when the layout cannot be computed", async () => {
		layoutOf.mockReturnValue(undefined);

		await expect(validateImageCache({ cache, data })).resolves.toBe(false);
	});

	it("rejects when the offset changed", async () => {
		await expect(
			validateImageCache({
				cache,
				data: { ...data, offset: { ...offset, left: 9 } },
			}),
		).resolves.toBe(false);
	});

	it("rejects when the crop changed", async () => {
		layoutOf.mockReturnValue({ crop: { ...crop, left: 50 } });

		await expect(validateImageCache({ cache, data })).resolves.toBe(false);
	});

	it("rejects a new image version", async () => {
		await expect(
			validateImageCache({
				cache,
				data: { ...data, image: { ...(image as object), version: 2 } as never },
			}),
		).resolves.toBe(false);
	});

	it("ignores sub-pixel size differences", async () => {
		await expect(
			validateImageCache({
				cache,
				data: {
					...data,
					image: { ...(image as object), width: 99.9, height: 50.1 } as never,
				},
			}),
		).resolves.toBe(true);
	});
});
