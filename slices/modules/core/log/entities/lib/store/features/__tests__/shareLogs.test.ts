import { getLogFiles } from "@modules/core/log/shared/lib";
import { createSagaTester, flush } from "@shared/lib/test/createSagaTester";
import { shareLogFile } from "../shareLogs/shareLogFile";
import { shareLogs } from "../shareLogs/shareLogs";
import { shareLogsSaga } from "../shareLogs/shareLogsSaga";

jest.mock("expo-file-system/legacy", () =>
	require("@shared/lib/test/mocks").fileSystemMock(),
);
jest.mock("@modules/core/log/shared/lib", () => ({ getLogFiles: jest.fn() }));
jest.mock("../shareLogs/shareLogFile", () => ({ shareLogFile: jest.fn() }));
jest.mock("@modules/core/notifications/shared/lib", () => ({
	sendNotification: (payload: unknown) => ({ type: "notify", payload }),
}));

const files = getLogFiles as jest.Mock;
const share = shareLogFile as jest.Mock;

const file = (name: string, modificationTime: number) => ({
	name,
	date: name,
	path: `file:///docs/${name}`,
	modificationTime,
});

beforeEach(() => {
	jest.clearAllMocks();
});

const run = async () => {
	const tester = createSagaTester();
	tester.run(shareLogsSaga);
	tester.dispatch(shareLogs());
	await flush();
	return tester;
};

describe("shareLogsSaga", () => {
	it("notifies when there are no logs", async () => {
		files.mockResolvedValue([]);

		const tester = await run();

		expect(share).not.toHaveBeenCalled();
		expect(tester.ofType("notify")).toEqual([
			{ type: "notify", payload: { message: "log.noLogs", type: "error" } },
		]);
	});

	it("shares the most recently modified log", async () => {
		files.mockResolvedValue([file("b", 10), file("a", 30), file("c", 20)]);

		await run();

		expect(share).toHaveBeenCalledTimes(1);
		expect(share).toHaveBeenCalledWith({ path: "file:///docs/a", name: "a" });
	});

	it("orders equally fresh logs by name", async () => {
		files.mockResolvedValue([file("b", 10), file("a", 10)]);

		await run();

		expect(share).toHaveBeenCalledWith({ path: "file:///docs/a", name: "a" });
	});

	it("survives a failed share", async () => {
		files.mockResolvedValue([file("a", 10)]);
		share.mockRejectedValue(new Error("cancelled"));

		const tester = await run();

		expect(tester.ofType("notify")).toEqual([]);
	});
});
