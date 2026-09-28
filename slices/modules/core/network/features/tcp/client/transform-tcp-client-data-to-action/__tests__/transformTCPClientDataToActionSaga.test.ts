import { sendTCPActionToServerSaga } from "@modules/core/network/entities/lib/store/features/tcp/client/sendTCPActionToServer/sendTCPActionToServerSaga";
import { sendTCPAction } from "@modules/core/network/entities/lib/store/features/tcp/sendTCPAction/sendTCPAction";
import { sendRemoteTCPActionSaga } from "@modules/core/network/features/tcp/common/send-remote-tcp-action/sendRemoteTCPActionSaga";
import {
	network,
	setHostIP,
	setNetworkRole,
	tcpClientSocketDataReceived,
} from "@modules/core/network/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { transformTCPClientDataToActionSaga } from "../transformTCPClientDataToActionSaga";

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);
jest.mock("@modules/core/log/shared/config", () => ({
	log: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
	tcpLog: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

const socket = { destroyed: false, id: "server-socket" };
jest.mock("@modules/core/network/shared/lib", () => {
	const actual = jest.requireActual("@modules/core/network/shared/lib");
	return {
		...actual,
		getTCPServerSocket: () => socket,
	};
});

const reducer = combineReducers({ network: network.reducer });

const buildIncomeData = (overrides: Partial<Record<string, unknown>> = {}) =>
	JSON.stringify({
		type: "test/hostAction",
		payload: { value: 1 },
		meta: {
			source: "tcp",
			networkId: "host-net-id",
			messageId: "m1",
			notify: "self",
			...overrides,
		},
	});

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.useRealTimers();
});

/**
 * Integration test across the full client-side receive-and-ack pipeline
 * (transformTCPClientDataToActionSaga -> sendRemoteTCPActionSaga -> sendTCPActionToServerSaga).
 *
 * Written 2026-09-28 while chasing what looked like a real bug: the client's ACK is dispatched as a
 * plain `put(tcpActionReceived(...))`, with no visible `createRemoteAction()` wrapper the way the
 * host's reply gets one in transformTCPServerDataToActionSaga. Turned out NOT to be a bug — verified
 * by temporarily reverting the (unneeded) "fix" and re-running this test, which stayed green either
 * way once traced fully: `tcpActionReceived`'s own action creator already applies `withRemoteMeta`
 * (tcpCommon.ts), which stamps `meta.remote = true` on every dispatch regardless of the call site.
 * That's the one thing `sendRemoteTCPActionSaga` requires to forward an action onto the wire, so the
 * ACK was always actually being sent. Kept as a real integration test locking in that this pipeline
 * — receive over TCP, apply locally, ACK back to the host — works end to end, not because it caught
 * a bug (it didn't; there wasn't one).
 */
describe("client receive-and-ack pipeline (transformTCPClientDataToActionSaga integration)", () => {
	it("applies the host's action locally AND sends a real ACK back over the wire", async () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setHostIP("192.168.1.10"));

		const tester = createSagaTester({ reducer, state });
		tester.run(transformTCPClientDataToActionSaga);
		tester.run(sendRemoteTCPActionSaga);
		tester.run(sendTCPActionToServerSaga);

		tester.dispatch(tcpClientSocketDataReceived({ data: buildIncomeData() }));
		await Promise.resolve();
		await Promise.resolve();

		// applied locally
		expect(tester.ofType("test/hostAction")).toHaveLength(1);

		// and a real ACK went out over the wire, addressed to the host, with the right messageId
		const sends = tester.ofType(sendTCPAction.type) as ReturnType<
			typeof sendTCPAction
		>[];
		const ackSend = sends.find(
			(a) => a.payload.action.type === "network/tcpActionReceived",
		);
		expect(ackSend).toBeDefined();
		expect(
			(ackSend?.payload.action as { payload: { messageId: string } }).payload
				.messageId,
		).toBe("m1");
	});

	it("still ACKs a retransmitted duplicate without applying the action twice", async () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setHostIP("192.168.1.10"));

		const tester = createSagaTester({ reducer, state });
		tester.run(transformTCPClientDataToActionSaga);
		tester.run(sendRemoteTCPActionSaga);
		tester.run(sendTCPActionToServerSaga);

		// module-level `appliedMessages` cache in the saga persists across tests in this file, so use
		// a messageId not touched by the other test to avoid cross-test contamination
		const data = buildIncomeData({ messageId: "m2" });
		tester.dispatch(tcpClientSocketDataReceived({ data }));
		await Promise.resolve();
		await Promise.resolve();
		tester.dispatch(tcpClientSocketDataReceived({ data }));
		await Promise.resolve();
		await Promise.resolve();

		expect(tester.ofType("test/hostAction")).toHaveLength(1); // applied once

		const sends = tester.ofType(sendTCPAction.type) as ReturnType<
			typeof sendTCPAction
		>[];
		const ackSends = sends.filter(
			(a) => a.payload.action.type === "network/tcpActionReceived",
		);
		expect(ackSends).toHaveLength(2); // ACKed both times
	});
});
