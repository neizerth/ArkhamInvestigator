import { getLogFiles } from "@modules/core/log/shared/lib";
import { createSagaTester, flush } from "@shared/lib/test/createSagaTester";
import * as FileSystem from "expo-file-system";
import moment from "moment";
import { clearLogs } from "../clearLogs/clearLogs";
import { clearLogsSaga } from "../clearLogs/clearLogsSaga";

jest.mock("expo-file-system", () =>
	require("@shared/lib/test/mocks").fileSystemMock(),
);
jest.mock("@modules/core/log/shared/lib", () => ({ getLogFiles: jest.fn() }));
jest.mock("@modules/core/notifications/shared/lib", () => ({
	sendNotification: (payload: unknown) => ({ type: "notify", payload }),
}));

const files = getLogFiles as jest.Mock;
const del = FileSystem.deleteAsync as jest.Mock;

const file = (name: string, modificationTime: number) => ({
	name,
	date: name,
	path: `file:///docs/${name}`,
	modificationTime,
});

const now = moment().unix();
const day = 24 * 60 * 60;

beforeEach(() => {
	jest.clearAllMocks();
	files.mockResolvedValue([
		file("fresh", now + 60),
		file("yesterday", now - day + 60),
		file("old", now - 5 * day),
	]);
});

const run = async (payload: Parameters<typeof clearLogs>[0]) => {
	const tester = createSagaTester();
	tester.run(clearLogsSaga);
	tester.dispatch(clearLogs(payload));
	await flush();
	return tester;
};

const deleted = () => del.mock.calls.map(([path]) => path);

describe("clearLogsSaga", () => {
	it("removes every log for `all`", async () => {
		await run({ period: "all" });

		expect(deleted()).toEqual([
			"file:///docs/fresh",
			"file:///docs/yesterday",
			"file:///docs/old",
		]);
		expect(del).toHaveBeenCalledWith(expect.any(String), { idempotent: true });
	});

	it("removes logs modified since yesterday for `yesterday`", async () => {
		await run({ period: "yesterday" });

		expect(deleted()).toEqual(["file:///docs/fresh", "file:///docs/yesterday"]);
	});

	it("removes logs modified after now for `today`", async () => {
		await run({ period: "today" });

		expect(deleted()).toEqual(["file:///docs/fresh"]);
	});

	it("is silent by default and notifies the count on request", async () => {
		const silent = await run({ period: "all" });
		expect(silent.ofType("notify")).toEqual([]);

		const loud = await run({ period: "all", notify: true });
		expect(loud.ofType("notify")).toEqual([
			{
				type: "notify",
				payload: {
					message: "file.removed",
					data: { count: 3 },
					type: "success",
				},
			},
		]);
	});

	it("notifies when nothing matches, only on request", async () => {
		files.mockResolvedValue([]);

		const silent = await run({ period: "all" });
		const loud = await run({ period: "all", notify: true });

		expect(del).not.toHaveBeenCalled();
		expect(silent.ofType("notify")).toEqual([]);
		expect(loud.ofType("notify")).toEqual([
			{ type: "notify", payload: { message: "log.noLogs", type: "info" } },
		]);
	});
});
