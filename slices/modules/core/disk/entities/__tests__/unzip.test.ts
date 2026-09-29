import { createSagaTester, flush } from "@shared/lib/test/createSagaTester";
import * as FileSystem from "expo-file-system/legacy";
import { unzip as unzipFile } from "react-native-zip-archive";
import { unzip, unzipComplete, unzipError } from "../unzip/unzip";
import { unzipSaga } from "../unzip/unzipSaga";

jest.mock("expo-file-system/legacy", () =>
	require("@shared/lib/test/mocks").fileSystemMock(),
);
jest.mock("react-native-zip-archive", () => ({ unzip: jest.fn() }));

const getInfo = FileSystem.getInfoAsync as jest.Mock;
const del = FileSystem.deleteAsync as jest.Mock;
const zip = unzipFile as jest.Mock;

const payload = { src: "a.zip", dest: "images" };

beforeEach(() => {
	jest.clearAllMocks();
	jest.spyOn(console, "log").mockImplementation(() => {});
	jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
	jest.restoreAllMocks();
});

const run = async (data: Parameters<typeof unzip>[0]) => {
	const tester = createSagaTester();
	tester.run(unzipSaga);
	tester.dispatch(unzip(data));
	await flush();
	return tester;
};

describe("unzipSaga", () => {
	it("unzips inside the document directory and reports the result path", async () => {
		getInfo.mockResolvedValue({ exists: true });
		zip.mockResolvedValue("/docs/images");

		const tester = await run(payload);

		expect(getInfo).toHaveBeenCalledWith("file:///docs/a.zip");
		expect(zip).toHaveBeenCalledWith(
			"file:///docs/a.zip",
			"file:///docs/images",
		);
		expect(del).not.toHaveBeenCalled();
		expect(tester.ofType(unzipComplete.type)).toEqual([
			unzipComplete({ ...payload, path: "/docs/images" }),
		]);
	});

	it("removes the archive when unlink is requested", async () => {
		getInfo.mockResolvedValue({ exists: true });
		zip.mockResolvedValue("/docs/images");

		await run({ ...payload, unlink: true });

		expect(del).toHaveBeenCalledWith("file:///docs/a.zip");
	});

	it("reports an error when the archive is missing", async () => {
		getInfo.mockResolvedValue({ exists: false });

		const tester = await run(payload);

		expect(zip).not.toHaveBeenCalled();
		expect(tester.ofType(unzipError.type)).toEqual([
			unzipError({ ...payload, error: "File not exists: file:///docs/a.zip" }),
		]);
		expect(tester.ofType(unzipComplete.type)).toEqual([]);
	});

	it("reports an error when unzipping fails", async () => {
		getInfo.mockResolvedValue({ exists: true });
		zip.mockRejectedValue(new Error("corrupted"));

		const tester = await run({ ...payload, unlink: true });

		expect(del).not.toHaveBeenCalled();
		expect(tester.ofType(unzipError.type)).toEqual([
			unzipError({ ...payload, unlink: true, error: "corrupted" }),
		]);
	});
});
