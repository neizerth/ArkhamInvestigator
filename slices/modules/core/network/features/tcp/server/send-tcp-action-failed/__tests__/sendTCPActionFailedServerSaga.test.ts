import type * as TCPClientSocket from "@modules/core/network/shared/lib/logic/tcp/socket/server";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import type * as SendTCPActionFailedServerSaga from "../sendTCPActionFailedServerSaga";

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);
jest.mock("@modules/core/log/shared/config", () => ({
	tcpLog: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));
// Same reasoning as the client-side test: keep the mocked barrel to just what the saga needs so
// it stays safe under `jest.isolateModules`.
jest.mock("@modules/core/network/shared/lib", () => ({
	...jest.requireActual("@modules/core/network/shared/lib/store/network"),
	...jest.requireActual(
		"@modules/core/network/shared/lib/logic/tcp/socket/server",
	),
	getSendTCPActionFailedDetail: () => ({}),
}));

const { network, setNetworkRole } = jest.requireActual(
	"@modules/core/network/shared/lib/store/network",
);
const { sendTCPActionFailed } = jest.requireActual(
	"@modules/core/network/entities/lib/store/features/tcp/sendTCPAction/sendTCPAction",
);
const { sendNotification } = jest.requireActual(
	"@modules/core/notifications/shared/lib/store/features/sendNotification/sendNotification",
);

const reducer = combineReducers({ network: network.reducer });

/**
 * Loads the saga fresh (module-level notify throttle isolation, see restartTCPClientSaga.test.ts)
 * AND grabs `setTCPClientSocket` from the SAME isolated registry: the mocked
 * `@modules/core/network/shared/lib` barrel re-runs its factory (and its
 * `jest.requireActual(".../socket/server")` call) inside every `isolateModules` block, so a
 * `setTCPClientSocket` obtained outside the block would write to a different `tcpSocketMap`
 * instance than the one the freshly-loaded saga reads from.
 */
const loadSaga = () => {
	let sagaMod: typeof SendTCPActionFailedServerSaga | undefined;
	let socketMod: typeof TCPClientSocket | undefined;
	jest.isolateModules(() => {
		sagaMod = require("../sendTCPActionFailedServerSaga");
		socketMod = require("@modules/core/network/shared/lib/logic/tcp/socket/server");
	});
	if (!sagaMod || !socketMod) {
		throw new Error("TCP server saga was not loaded");
	}
	return {
		saga: sagaMod.sendTCPActionFailedServerSaga,
		setTCPClientSocket: socketMod.setTCPClientSocket,
	};
};

const buildFailedAction = (socket: unknown) =>
	sendTCPActionFailed({
		socket,
		action: { type: "some/action" },
		messageId: "m1",
		type: "socket-destroyed",
	});

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.useRealTimers();
});

describe("sendTCPActionFailedServerSaga", () => {
	it("no-ops for a client role", async () => {
		const { saga } = loadSaga();
		const state = reducer(
			reducer(undefined, { type: "@@init" }),
			setNetworkRole("client"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(saga);

		const socket = { destroy: jest.fn() };
		tester.dispatch(buildFailedAction(socket));
		await jest.advanceTimersByTimeAsync(0);

		expect(socket.destroy).not.toHaveBeenCalled();
		expect(tester.ofType(sendNotification.type)).toHaveLength(0);
	});

	it("destroys the socket and toasts when the networkId resolves", async () => {
		const { saga, setTCPClientSocket } = loadSaga();
		const socket = { destroy: jest.fn() };
		setTCPClientSocket("client-1", socket as never);

		const state = reducer(
			reducer(undefined, { type: "@@init" }),
			setNetworkRole("host"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(saga);

		tester.dispatch(buildFailedAction(socket));
		await jest.advanceTimersByTimeAsync(0);

		expect(socket.destroy).toHaveBeenCalledTimes(1);
		expect(tester.ofType(sendNotification.type)).toHaveLength(1);
	});

	it("no-ops (no further action dispatched) when the socket's networkId cannot be resolved", async () => {
		const { saga } = loadSaga();
		const state = reducer(
			reducer(undefined, { type: "@@init" }),
			setNetworkRole("host"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(saga);

		const unresolvedSocket = { destroy: jest.fn() };
		tester.dispatch(buildFailedAction(unresolvedSocket));
		await jest.advanceTimersByTimeAsync(0);

		expect(unresolvedSocket.destroy).not.toHaveBeenCalled();
		expect(tester.actions).toHaveLength(1); // only the dispatched sendTCPActionFailed itself
	});

	it("swallows a destroy() that throws and still proceeds to the notification", async () => {
		const { saga, setTCPClientSocket } = loadSaga();
		const throwingSocket = {
			destroy: jest.fn(() => {
				throw new Error("already torn down");
			}),
		};
		setTCPClientSocket("client-2", throwingSocket as never);

		const state = reducer(
			reducer(undefined, { type: "@@init" }),
			setNetworkRole("host"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(saga);

		tester.dispatch(buildFailedAction(throwingSocket));
		await jest.advanceTimersByTimeAsync(0);

		expect(throwingSocket.destroy).toHaveBeenCalledTimes(1);
		expect(tester.ofType(sendNotification.type)).toHaveLength(1);
	});

	it("throttles the toast to one per 8s", async () => {
		const { saga, setTCPClientSocket } = loadSaga();
		const socketA = { destroy: jest.fn() };
		const socketB = { destroy: jest.fn() };
		setTCPClientSocket("client-a", socketA as never);
		setTCPClientSocket("client-b", socketB as never);

		const state = reducer(
			reducer(undefined, { type: "@@init" }),
			setNetworkRole("host"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(saga);

		tester.dispatch(buildFailedAction(socketA));
		await jest.advanceTimersByTimeAsync(0);
		expect(tester.ofType(sendNotification.type)).toHaveLength(1);

		tester.dispatch(buildFailedAction(socketB));
		await jest.advanceTimersByTimeAsync(0);
		expect(tester.ofType(sendNotification.type)).toHaveLength(1); // still throttled

		await jest.advanceTimersByTimeAsync(8_000);

		tester.dispatch(buildFailedAction(socketA));
		await jest.advanceTimersByTimeAsync(0);
		expect(tester.ofType(sendNotification.type)).toHaveLength(2);
	});
});
