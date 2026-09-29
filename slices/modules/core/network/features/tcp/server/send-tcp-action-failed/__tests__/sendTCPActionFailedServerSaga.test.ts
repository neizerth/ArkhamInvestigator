import { sendTCPActionFailed } from "@modules/core/network/entities/lib/store/features/tcp/sendTCPAction/sendTCPAction";
import { setTCPClientSocket } from "@modules/core/network/shared/lib/logic/tcp/socket/server";
import {
	network,
	setNetworkRole,
} from "@modules/core/network/shared/lib/store/network";
import { sendNotification } from "@modules/core/notifications/shared/lib/store/features/sendNotification/sendNotification";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { useFreshFakeClock } from "@shared/lib/test/useFreshFakeClock";
import { sendTCPActionFailedServerSaga } from "../sendTCPActionFailedServerSaga";

const reducer = combineReducers({ network: network.reducer });

const createSocket = (destroy = jest.fn()) => ({ destroy });

/** Registers `socket` as connected client `networkId`, so the saga can resolve it. */
const connect = (networkId: string, socket: ReturnType<typeof createSocket>) =>
	setTCPClientSocket(networkId, socket as never);

const setup = (role: "host" | "client" = "host") => {
	const state = reducer(
		reducer(undefined, { type: "@@init" }),
		setNetworkRole(role),
	);
	const tester = createSagaTester({ reducer, state });
	tester.run(sendTCPActionFailedServerSaga);

	return {
		tester,
		fail: async (socket: ReturnType<typeof createSocket>) => {
			tester.dispatch(
				sendTCPActionFailed({
					socket: socket as never,
					action: { type: "some/action" } as never,
					messageId: "m1",
					type: "socket-destroyed",
				}),
			);
			await jest.advanceTimersByTimeAsync(0);
		},
		toasts: () => tester.ofType(sendNotification.type).length,
	};
};

// the saga throttles toasts with module-level state
useFreshFakeClock();

describe("sendTCPActionFailedServerSaga", () => {
	it("no-ops for a client role", async () => {
		const { fail, toasts } = setup("client");
		const socket = createSocket();

		await fail(socket);

		expect(socket.destroy).not.toHaveBeenCalled();
		expect(toasts()).toBe(0);
	});

	it("destroys the socket and toasts when the networkId resolves", async () => {
		const { fail, toasts } = setup();
		const socket = createSocket();
		connect("client-1", socket);

		await fail(socket);

		expect(socket.destroy).toHaveBeenCalledTimes(1);
		expect(toasts()).toBe(1);
	});

	it("no-ops when the socket's networkId cannot be resolved", async () => {
		const { fail, tester } = setup();
		const unresolved = createSocket();

		await fail(unresolved);

		expect(unresolved.destroy).not.toHaveBeenCalled();
		expect(tester.actions).toHaveLength(1); // only the dispatched sendTCPActionFailed itself
	});

	it("swallows a destroy() that throws and still proceeds to the notification", async () => {
		const { fail, toasts } = setup();
		const throwing = createSocket(
			jest.fn(() => {
				throw new Error("already torn down");
			}),
		);
		connect("client-2", throwing);

		await fail(throwing);

		expect(throwing.destroy).toHaveBeenCalledTimes(1);
		expect(toasts()).toBe(1);
	});

	it("throttles the toast to one per 8s", async () => {
		const { fail, toasts } = setup();
		const socketA = createSocket();
		const socketB = createSocket();
		connect("client-a", socketA);
		connect("client-b", socketB);

		await fail(socketA);
		expect(toasts()).toBe(1);

		await fail(socketB);
		expect(toasts()).toBe(1); // still throttled

		await jest.advanceTimersByTimeAsync(8_000);

		await fail(socketA);
		expect(toasts()).toBe(2);
	});
});
