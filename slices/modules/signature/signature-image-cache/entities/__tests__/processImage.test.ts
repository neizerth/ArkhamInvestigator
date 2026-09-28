import * as FileSystem from "expo-file-system/legacy";
import { ImageManipulator } from "expo-image-manipulator";
import { processImage } from "../createSignatureCache/processImage";

jest.mock("expo-file-system/legacy", () =>
	require("@shared/lib/test/mocks").fileSystemMock(),
);
jest.mock("expo-image-manipulator", () => ({
	ImageManipulator: { manipulate: jest.fn() },
	SaveFormat: { WEBP: "webp" },
}));

const getInfo = FileSystem.getInfoAsync as jest.Mock;
const manipulate = ImageManipulator.manipulate as jest.Mock;

const saveAsync = jest.fn();
const ctx = {
	crop: jest.fn(),
	resize: jest.fn(),
	renderAsync: jest.fn(),
};

const options = {
	source: "file:///docs/a.webp",
	view: { width: 100, height: 50 },
	layout: {
		crop: { left: 10, top: 20, width: 30, height: 40 },
		scale: 1,
		faceHeightPercent: 1,
	},
	image: {} as never,
};

beforeEach(() => {
	jest.clearAllMocks();
	getInfo.mockResolvedValue({ exists: true, size: 10 });
	manipulate.mockReturnValue(ctx);
	ctx.renderAsync.mockResolvedValue({ saveAsync });
	saveAsync.mockResolvedValue({ uri: "file:///cache/out.webp" });
});

describe("processImage", () => {
	it("crops, resizes by pixel ratio and saves as webp", async () => {
		await expect(processImage(options)).resolves.toEqual({
			uri: "file:///cache/out.webp",
		});

		expect(manipulate).toHaveBeenCalledWith(options.source);
		expect(ctx.crop).toHaveBeenCalledWith({
			left: 10,
			top: 20,
			width: 30,
			height: 40,
			originX: 10,
			originY: 20,
		});
		const { width, height } = ctx.resize.mock.calls[0][0];
		expect(width / options.view.width).toBe(height / options.view.height);
		expect(saveAsync).toHaveBeenCalledWith({ format: "webp" });
	});

	it("rejects a missing source", async () => {
		getInfo.mockResolvedValue({ exists: false });

		await expect(processImage(options)).rejects.toThrow(
			`Source image file does not exist: ${options.source}`,
		);
		expect(manipulate).not.toHaveBeenCalled();
	});

	it("rejects an empty source", async () => {
		getInfo.mockResolvedValue({ exists: true, size: 0 });

		await expect(processImage(options)).rejects.toThrow(
			`Source image file is empty: ${options.source}`,
		);
	});

	it("wraps manipulator errors with the source", async () => {
		ctx.renderAsync.mockRejectedValue(new Error("decode"));

		await expect(processImage(options)).rejects.toThrow(
			`Failed to process image ${options.source}: decode`,
		);
	});
});
