import { createSagaTester, flush } from "@shared/lib/test/createSagaTester";
import * as FileSystem from "expo-file-system/legacy";
import { removeDirectory } from "../removeDirectory/removeDirectory";
import { removeDirectorySaga } from "../removeDirectory/removeDirectorySaga";

jest.mock("expo-file-system/legacy", () =>
	require("@shared/lib/test/mocks").fileSystemMock(),
);

const getInfo = FileSystem.getInfoAsync as jest.Mock;
const del = FileSystem.deleteAsync as jest.Mock;

beforeEach(() => {
	jest.clearAllMocks();
});

const run = async () => {
	const tester = createSagaTester();
	tester.run(removeDirectorySaga);
	tester.dispatch(removeDirectory({ directory: "file:///docs/images" }));
	await flush();
};

describe("removeDirectorySaga", () => {
	it("deletes an existing directory", async () => {
		getInfo.mockResolvedValue({ exists: true });

		await run();

		expect(getInfo).toHaveBeenCalledWith("file:///docs/images");
		expect(del).toHaveBeenCalledWith("file:///docs/images");
	});

	it("does nothing when the directory does not exist", async () => {
		getInfo.mockResolvedValue({ exists: false });

		await run();

		expect(del).not.toHaveBeenCalled();
	});
});
