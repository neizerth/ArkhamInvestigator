import { createSagaTester, flush } from "@shared/lib/test/createSagaTester";
import * as FileSystem from "expo-file-system/legacy";
import { getBase64Grayscale } from "../../shared/lib";
import {
	createGrayscaleImage,
	grayscaleImageCreated,
} from "../createGrayscaleImage/createGrayscaleImage";
import { createGrayscaleImageSaga } from "../createGrayscaleImage/createGrayscaleImageSaga";

jest.mock("expo-file-system/legacy", () =>
	require("@shared/lib/test/mocks").fileSystemMock(),
);
jest.mock("@modules/core/disk/shared/lib", () => ({
	getFileBase64Contents: jest
		.fn()
		.mockResolvedValue("data:image/png;base64,SRC"),
}));
jest.mock("../../shared/lib", () => ({ getBase64Grayscale: jest.fn() }));

const getInfo = FileSystem.getInfoAsync as jest.Mock;
const mkdir = FileSystem.makeDirectoryAsync as jest.Mock;
const write = FileSystem.writeAsStringAsync as jest.Mock;
const grayscale = getBase64Grayscale as jest.Mock;

const payload = {
	source: "file:///docs/color/a.png",
	path: "file:///docs/gray/a.png",
};

beforeEach(() => {
	jest.clearAllMocks();
	grayscale.mockResolvedValue("GRAY");
	jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
	jest.restoreAllMocks();
});

const run = async () => {
	const tester = createSagaTester();
	tester.run(createGrayscaleImageSaga);
	tester.dispatch(createGrayscaleImage(payload));
	await flush();
	return tester;
};

describe("createGrayscaleImageSaga", () => {
	it("creates the missing directory and writes the grayscale image", async () => {
		getInfo.mockResolvedValue({ exists: false });

		const tester = await run();

		expect(grayscale).toHaveBeenCalledWith("data:image/png;base64,SRC");
		expect(getInfo).toHaveBeenCalledWith("file:///docs/gray");
		expect(mkdir).toHaveBeenCalledWith("file:///docs/gray", {
			intermediates: true,
		});
		expect(write).toHaveBeenCalledWith(payload.path, "GRAY", {
			encoding: "base64",
		});
		expect(tester.ofType(grayscaleImageCreated.type)).toEqual([
			grayscaleImageCreated(payload),
		]);
	});

	it("does not recreate an existing directory", async () => {
		getInfo.mockResolvedValue({ exists: true });

		await run();

		expect(mkdir).not.toHaveBeenCalled();
		expect(write).toHaveBeenCalled();
	});

	it("still reports completion when conversion fails", async () => {
		grayscale.mockRejectedValue(new Error("bad image"));

		const tester = await run();

		expect(write).not.toHaveBeenCalled();
		expect(tester.ofType(grayscaleImageCreated.type)).toEqual([
			grayscaleImageCreated(payload),
		]);
	});
});
