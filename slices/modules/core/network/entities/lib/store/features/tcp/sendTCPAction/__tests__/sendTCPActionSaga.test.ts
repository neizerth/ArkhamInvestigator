import { tcpSocketWrite } from "@modules/core/network/shared/lib";
import { createSagaTester, flush } from "@shared/lib/test/createSagaTester";
import { sendTCPAction, sendTCPActionFailed } from "../sendTCPAction";
import { sendTCPActionSaga } from "../sendTCPActionSaga";

jest.mock("@modules/core/network/shared/lib", () => ({
	...jest.requireActual("@modules/core/network/shared/lib"),
	tcpSocketWrite: jest.fn(),
}));

const write = tcpSocketWrite as jest.Mock;

const state = { network: { deviceNetworkId: "host-id" } };

/** a real TcpSocket is a graph full of cycles (event emitter -> listeners -> context -> socket) */
const createSocket = () => {
	const socket: Record<string, unknown> = { destroyed: false };
	socket._events = { data: { context: socket } };
	return socket as never;
};

const run = async (action: Parameters<typeof sendTCPAction>[0]["action"]) => {
	const tester = createSagaTester({ state });
	tester.run(sendTCPActionSaga);
	tester.dispatch(
		sendTCPAction({ action, socket: createSocket(), messageId: "m1" }),
	);
	await flush();
	return tester;
};

beforeEach(() => {
	jest.clearAllMocks();
});

describe("sendTCPActionSaga", () => {
	it("writes the action as a json line with the envelope meta", async () => {
		await run({
			type: "board/setBoardPartInternal",
			payload: { value: 1 },
			meta: { notify: "all", remote: true },
		} as never);

		expect(write).toHaveBeenCalledTimes(1);
		const [, line] = write.mock.calls[0];
		expect(line.endsWith("\n")).toBe(true);
		expect(JSON.parse(line)).toMatchObject({
			type: "board/setBoardPartInternal",
			payload: { value: 1 },
			meta: { notify: "all", messageId: "m1", source: "tcp" },
		});
		expect(JSON.parse(line).meta.remote).toBeUndefined();
	});

	// The host forwards a client's action to the other clients with the sender's socket still in
	// the meta (createTCPIncomeAction puts it there): `JSON.stringify` threw on the cycle, so the
	// other clients never received it — with three devices the selected investigators of the
	// clients never reached each other and the third board fell back to "fallback".
	it("does not put the origin socket into the packet", async () => {
		const tester = await run({
			type: "signatureSelection/addSelectedSignature",
			payload: { code: "02001" },
			meta: { notify: "all", fromRemote: true, socket: createSocket() },
		} as never);

		expect(tester.ofType(sendTCPActionFailed.type)).toEqual([]);
		expect(write).toHaveBeenCalledTimes(1);
		const line = write.mock.calls[0][1] as string;
		expect(JSON.parse(line).meta.socket).toBeUndefined();
		expect(JSON.parse(line).payload).toEqual({ code: "02001" });
	});
});
