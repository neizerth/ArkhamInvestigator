import { sendTCPActionToClient } from "@modules/core/network/entities/lib/store/features/tcp/server/sendTCPActionToClient/sendTCPActionToClient";
import { tcpServerSocketDataReceived } from "@modules/core/network/shared/lib";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { transformTCPServerDataToActionSaga } from "../transformTCPServerDataToActionSaga";

const mockSetTCPClientSocket = jest.fn();
jest.mock("@modules/core/network/shared/lib", () => {
	const actual = jest.requireActual("@modules/core/network/shared/lib");
	return {
		...actual,
		setTCPClientSocket: (...args: unknown[]) => mockSetTCPClientSocket(...args),
	};
});
const socket = { id: "client-socket" };

const buildData = (overrides: Partial<Record<string, unknown>> = {}) =>
	JSON.stringify({
		type: "test/businessAction",
		payload: { value: 1 },
		meta: {
			source: "tcp",
			networkId: "client-1",
			messageId: "m1",
			notify: "self",
			...overrides,
		},
	});

beforeEach(() => {
	mockSetTCPClientSocket.mockReset();
});

describe("transformTCPServerDataToActionSaga", () => {
	it("applies the client's action locally and refreshes the socket mapping", async () => {
		const tester = createSagaTester();
		tester.run(transformTCPServerDataToActionSaga);

		tester.dispatch(
			tcpServerSocketDataReceived({
				socket: socket as never,
				data: buildData({ messageId: "m-apply" }),
			}),
		);
		await Promise.resolve();

		expect(tester.ofType("test/businessAction")).toHaveLength(1);
		expect(mockSetTCPClientSocket).toHaveBeenCalledWith("client-1", socket);
	});

	it("ACKs the sender only (targetNetworkId), not a broadcast", async () => {
		const tester = createSagaTester();
		tester.run(transformTCPServerDataToActionSaga);

		tester.dispatch(
			tcpServerSocketDataReceived({
				socket: socket as never,
				data: buildData({ messageId: "m-target" }),
			}),
		);
		await Promise.resolve();

		const acks = tester.ofType(
			"network/tcpActionReceived",
		) as unknown as Array<{
			meta: { targetNetworkId?: string };
		}>;
		expect(acks).toHaveLength(1);
		expect(acks[0].meta.targetNetworkId).toBe("client-1");
	});

	it("does not ACK an ACK (avoids a confirm-loop deadlock)", async () => {
		const tester = createSagaTester();
		tester.run(transformTCPServerDataToActionSaga);

		// a genuine ACK payload: type is "network/tcpActionReceived", payload is {messageId, type}
		const ackData = JSON.stringify({
			type: "network/tcpActionReceived",
			payload: { messageId: "m-ack", type: "test/businessAction" },
			meta: {
				source: "tcp",
				networkId: "client-1",
				messageId: "m-ack",
				notify: "self",
			},
		});
		tester.dispatch(
			tcpServerSocketDataReceived({ socket: socket as never, data: ackData }),
		);
		await Promise.resolve();

		// the ACK itself is still applied locally (it resolves the host's own pending retry loop)...
		expect(tester.ofType("network/tcpActionReceived")).toHaveLength(1);
		// ...but no NEW confirmation is sent back out for it
		expect(tester.ofType(sendTCPActionToClient.type)).toHaveLength(0);
	});

	it("still ACKs a retransmitted duplicate but does not apply it twice or re-broadcast it", async () => {
		const tester = createSagaTester();
		tester.run(transformTCPServerDataToActionSaga);

		// unique messageId: `appliedMessages` is a module-level cache shared across tests in this file
		const data = buildData({ notify: "all", messageId: "m-dup" });
		tester.dispatch(
			tcpServerSocketDataReceived({ socket: socket as never, data }),
		);
		await Promise.resolve();
		tester.dispatch(
			tcpServerSocketDataReceived({ socket: socket as never, data }),
		);
		await Promise.resolve();

		expect(tester.ofType("test/businessAction")).toHaveLength(1); // applied once
		expect(tester.ofType("network/tcpActionReceived")).toHaveLength(2); // ACKed both times
		expect(tester.ofType(sendTCPActionToClient.type)).toHaveLength(1); // broadcast only once
	});

	it("broadcasts to all clients except the sender when notify is 'all'", async () => {
		const tester = createSagaTester();
		tester.run(transformTCPServerDataToActionSaga);

		tester.dispatch(
			tcpServerSocketDataReceived({
				socket: socket as never,
				data: buildData({ notify: "all", messageId: "m-broadcast" }),
			}),
		);
		await Promise.resolve();

		const broadcasts = tester.ofType(
			sendTCPActionToClient.type,
		) as unknown as Array<{
			payload: { type: string; except?: string[] };
		}>;
		expect(broadcasts).toHaveLength(1);
		expect(broadcasts[0].payload.type).toBe("all");
		expect(broadcasts[0].payload.except).toEqual(["client-1"]);
	});

	it("does not broadcast when notify is 'self'", async () => {
		const tester = createSagaTester();
		tester.run(transformTCPServerDataToActionSaga);

		tester.dispatch(
			tcpServerSocketDataReceived({
				socket: socket as never,
				data: buildData({ notify: "self", messageId: "m-self" }),
			}),
		);
		await Promise.resolve();

		expect(tester.ofType("test/businessAction")).toHaveLength(1); // still applied locally
		expect(tester.ofType(sendTCPActionToClient.type)).toHaveLength(0);
	});

	it("does not throw on malformed JSON, and does not apply or ACK anything", async () => {
		const tester = createSagaTester();
		tester.run(transformTCPServerDataToActionSaga);

		tester.dispatch(
			tcpServerSocketDataReceived({
				socket: socket as never,
				data: "{not json",
			}),
		);
		await Promise.resolve();

		expect(tester.ofType("network/tcpActionReceived")).toHaveLength(0);
	});

	it("ignores data that isn't a well-formed TCP income action", async () => {
		const tester = createSagaTester();
		tester.run(transformTCPServerDataToActionSaga);

		tester.dispatch(
			tcpServerSocketDataReceived({
				socket: socket as never,
				data: JSON.stringify({ type: "test/action", payload: {} }), // no meta at all
			}),
		);
		await Promise.resolve();

		expect(tester.ofType("test/action")).toHaveLength(0);
	});
});
