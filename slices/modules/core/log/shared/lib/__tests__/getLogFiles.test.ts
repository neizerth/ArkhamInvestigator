import * as FileSystem from "expo-file-system";
import { getLogFiles } from "../getLogFiles";

jest.mock("expo-file-system", () =>
	require("@shared/lib/test/mocks").fileSystemMock(),
);

const readDir = FileSystem.readDirectoryAsync as jest.Mock;
const getInfo = FileSystem.getInfoAsync as jest.Mock;

beforeEach(() => {
	jest.clearAllMocks();
});

describe("getLogFiles", () => {
	it("returns only log files with a date parsed from the name", async () => {
		readDir.mockResolvedValue(["logs_2026-01-02.txt", "other.txt", "images"]);
		getInfo.mockResolvedValue({
			exists: true,
			uri: "file:///docs/logs_2026-01-02.txt",
			modificationTime: 1700,
		});

		await expect(getLogFiles()).resolves.toEqual([
			{
				name: "logs_2026-01-02.txt",
				date: "2026-01-02",
				path: "file:///docs/logs_2026-01-02.txt",
				modificationTime: 1700,
			},
		]);
		expect(readDir).toHaveBeenCalledWith("file:///docs/");
		expect(getInfo).toHaveBeenCalledTimes(1);
	});

	it("skips files that vanished and defaults a missing modification time", async () => {
		readDir.mockResolvedValue(["logs_a.txt", "logs_b.txt"]);
		getInfo
			.mockResolvedValueOnce({ exists: false })
			.mockResolvedValueOnce({ exists: true, uri: "file:///docs/logs_b.txt" });

		const files = await getLogFiles();

		expect(
			files.map(({ name, modificationTime }) => [name, modificationTime]),
		).toEqual([["logs_b.txt", 0]]);
	});
});
