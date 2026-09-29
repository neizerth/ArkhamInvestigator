import * as FileSystem from "expo-file-system";
import { getFileBase64Contents } from "../getFileBase64Contents";

jest.mock("expo-file-system", () =>
	require("@shared/lib/test/mocks").fileSystemMock(),
);

const read = FileSystem.readAsStringAsync as jest.Mock;

beforeEach(() => {
	jest.clearAllMocks();
	read.mockResolvedValue("QUJD");
});

describe("getFileBase64Contents", () => {
	it("reads the file as base64", async () => {
		await getFileBase64Contents("file:///docs/a.png");

		expect(read).toHaveBeenCalledWith("file:///docs/a.png", {
			encoding: "base64",
		});
	});

	it("wraps contents into a data uri with the mime type by extension", async () => {
		await expect(getFileBase64Contents("file:///docs/a.png")).resolves.toBe(
			"data:image/png;base64,QUJD",
		);
		await expect(getFileBase64Contents("file:///docs/a.webp")).resolves.toBe(
			"data:image/webp;base64,QUJD",
		);
	});

	it("returns raw contents when mime is not requested", async () => {
		await expect(
			getFileBase64Contents("file:///docs/noext", false),
		).resolves.toBe("QUJD");
	});

	it("throws on an unknown mime type", async () => {
		await expect(getFileBase64Contents("file:///docs/noext")).rejects.toThrow(
			"Invalid mime type",
		);
	});
});
