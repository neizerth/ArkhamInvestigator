import { restartTCPClient } from "@modules/core/network/entities/lib/store/features/tcp/client/restartTCPClient";
import { sendTCPActionFailed } from "@modules/core/network/entities/lib/store/features/tcp/sendTCPAction/sendTCPAction";
import { getTCPServerSocket } from "@modules/core/network/shared/lib/logic/tcp/socket/client";
import {
	network,
	setHostIP,
	setNetworkRole,
} from "@modules/core/network/shared/lib/store/network";
import { sendNotification } from "@modules/core/notifications/shared/lib/store/features/sendNotification/sendNotification";
import {
	router,
	setCurrentRoute,
} from "@modules/core/router/shared/lib/store/router";
import { game, setGameStatus } from "@modules/game/shared/lib/store/game";
import { combineReducers } from "@reduxjs/toolkit";
import { routes } from "@shared/config/routes";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { stateAfter } from "@shared/lib/test/stateAfter";
import { useFreshFakeClock } from "@shared/lib/test/useFreshFakeClock";
import { sendTCPActionFailedClientSaga } from "../sendTCPActionFailedClientSaga";

jest.mock("@modules/core/network/shared/lib/logic/tcp/socket/client", () => ({
	...jest.requireActual(
		"@modules/core/network/shared/lib/logic/tcp/socket/client",
	),
	getTCPServerSocket: jest.fn(),
}));

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
	router: router.reducer,
});

const socketA = { id: "a" } as never;
const socketB = { id: "b" } as never;

type Scenario = {
	role?: "client" | "host";
	hostIP?: string;
	gameStatus?: Parameters<typeof setGameStatus>[0];
	route?: Parameters<typeof setCurrentRoute>[0];
	activeSocket?: unknown;
};

/** A client that lost its send on `socketA`; override only what the case is about. */
const setup = ({
	role = "client",
	hostIP = "192.168.1.10",
	gameStatus = "playing",
	route = routes.board,
	activeSocket = socketA,
}: Scenario = {}) => {
	jest.mocked(getTCPServerSocket).mockReturnValue(activeSocket as never);

	const state = stateAfter(
		reducer,
		setNetworkRole(role),
		...(hostIP ? [setHostIP(hostIP)] : []),
		setGameStatus(gameStatus),
		setCurrentRoute(route),
	);

	const tester = createSagaTester({ reducer, state });
	tester.run(sendTCPActionFailedClientSaga);

	return {
		fail: async (socket: never = socketA) => {
			tester.dispatch(
				sendTCPActionFailed({
					socket,
					action: { type: "some/action" } as never,
					messageId: "m1",
					type: "socket-destroyed",
				}),
			);
			await jest.advanceTimersByTimeAsync(0);
		},
		restarts: () => tester.ofType(restartTCPClient.type).length,
		toasts: () => tester.ofType(sendNotification.type).length,
	};
};

// the saga throttles toasts with module-level state
useFreshFakeClock();

describe("sendTCPActionFailedClientSaga", () => {
	it("restarts the client and toasts when everything lines up", async () => {
		const { fail, restarts, toasts } = setup();

		await fail();

		expect(restarts()).toBe(1);
		expect(toasts()).toBe(1);
	});

	it("does nothing for a host role", async () => {
		const { fail, restarts } = setup({ role: "host" });

		await fail();

		expect(restarts()).toBe(0);
	});

	it("ignores a failure from a stale socket that is no longer the active one", async () => {
		const { fail, restarts } = setup({ activeSocket: socketB });

		await fail(socketA);

		expect(restarts()).toBe(0);
	});

	it("does nothing when hostIP is unset", async () => {
		const { fail, restarts } = setup({ hostIP: "" });

		await fail();

		expect(restarts()).toBe(0);
	});

	// eligibility is delegated to selectClientReconnectAllowed
	it("does nothing on the home route", async () => {
		const { fail, restarts } = setup({ route: routes.home });

		await fail();

		expect(restarts()).toBe(0);
	});

	// Same rule as a dropped socket: a failed send in the lobby retries instead of giving up.
	it("retries when gameStatus is 'initial' on the lobby route", async () => {
		const { fail, restarts } = setup({
			gameStatus: "initial",
			route: routes.startMultiplayer,
		});

		await fail();

		expect(restarts()).toBe(1);
	});

	it("still gives up when gameStatus is 'initial' off the lobby route", async () => {
		const { fail, restarts } = setup({
			gameStatus: "initial",
			route: routes.settings,
		});

		await fail();

		expect(restarts()).toBe(0);
	});

	it("throttles the toast to one per 8s but still restarts every time", async () => {
		const { fail, restarts, toasts } = setup();

		await fail();
		await fail();
		expect(toasts()).toBe(1);
		expect(restarts()).toBe(2);

		await jest.advanceTimersByTimeAsync(8_000);
		await fail();
		expect(toasts()).toBe(2);
		expect(restarts()).toBe(3);
	});
});
