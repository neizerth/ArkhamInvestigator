import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Share } from "react-native";
import { shareLogFile } from "../shareLogs/shareLogFile";

jest.mock("expo-file-system", () =>
	require("@shared/lib/test/mocks").fileSystemMock(),
);
jest.mock("expo-sharing", () => ({
	isAvailableAsync: jest.fn(),
	shareAsync: jest.fn(),
}));

const isAvailable = Sharing.isAvailableAsync as jest.Mock;
const shareAsync = Sharing.shareAsync as jest.Mock;
const read = FileSystem.readAsStringAsync as jest.Mock;

const options = { path: "file:///docs/logs_a.txt", name: "logs_a.txt" };

beforeEach(() => {
	jest.clearAllMocks();
});

describe("shareLogFile", () => {
	it("shares the file through the native sheet when sharing is available", async () => {
		isAvailable.mockResolvedValue(true);

		await shareLogFile(options);

		expect(shareAsync).toHaveBeenCalledWith(options.path, {
			dialogTitle: options.name,
			mimeType: "text/plain",
			UTI: "public.plain-text",
		});
		expect(read).not.toHaveBeenCalled();
	});

	it("falls back to sharing the file contents as text", async () => {
		isAvailable.mockResolvedValue(false);
		read.mockResolvedValue("log body");
		const share = jest.spyOn(Share, "share").mockResolvedValue({
			action: "sharedAction",
		});

		await shareLogFile(options);

		expect(read).toHaveBeenCalledWith(options.path, { encoding: "utf8" });
		expect(share).toHaveBeenCalledWith(
			{ title: options.name, message: "log body" },
			{ subject: options.name },
		);
		expect(shareAsync).not.toHaveBeenCalled();

		share.mockRestore();
	});
});
