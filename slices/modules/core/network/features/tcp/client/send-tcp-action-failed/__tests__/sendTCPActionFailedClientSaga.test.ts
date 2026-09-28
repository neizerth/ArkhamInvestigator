import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);
jest.mock("@modules/core/log/shared/config", () => ({
	tcpLog: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));
// `selectClientReconnectAllowed` imports `routes` from `@shared/config`, whose barrel also
// re-exports `./device` — that reads `Platform.Version` on load and breaks under
// `jest.isolateModules` below (the isolated registry re-requires `react-native` fresh, without
// jest.setup's `Platform.Version` patch). Keep this to just `routes`, the actual piece needed.
jest.mock("@shared/config", () => ({
	...jest.requireActual("@shared/config/routes"),
}));
// Keep this to the pieces the saga actually needs, same reasoning as restartTCPClientSaga.test.ts:
// the full `@modules/core/network/shared/lib` barrel pulls in device config that breaks under
// `jest.isolateModules`. `selectClientReconnectAllowed` is the actual implementation (not a mock)
// since the saga now delegates its reconnect-eligibility check to it — see its own module for
// what it depends on (network + game + router slices, all present in this test's `reducer`).
const mockGetTCPServerSocket = jest.fn();
jest.mock("@modules/core/network/shared/lib", () => ({
	...jest.requireActual("@modules/core/network/shared/lib/store/network"),
	...jest.requireActual(
		"@modules/core/network/shared/lib/store/selectors/selectClientReconnectAllowed",
	),
	getSendTCPActionFailedDetail: () => ({}),
	getTCPServerSocket: () => mockGetTCPServerSocket(),
}));

const { network, setHostIP, setNetworkRole } = jest.requireActual(
	"@modules/core/network/shared/lib/store/network",
);
const { game, setGameStatus } = jest.requireActual(
	"@modules/game/shared/lib/store/game",
);
const { router, setCurrentRoute } = jest.requireActual(
	"@modules/core/router/shared/lib/store/router",
);
const { routes } = jest.requireActual("@shared/config");
const { sendTCPActionFailed } = jest.requireActual(
	"@modules/core/network/entities/lib/store/features/tcp/sendTCPAction/sendTCPAction",
);
const { restartTCPClient } = jest.requireActual(
	"@modules/core/network/entities/lib/store/features/tcp/client/restartTCPClient",
);
const { sendNotification } = jest.requireActual(
	"@modules/core/notifications/shared/lib/store/features/sendNotification/sendNotification",
);

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
	router: router.reducer,
});

const loadSaga = () => {
	let mod: typeof import("../sendTCPActionFailedClientSaga");
	jest.isolateModules(() => {
		mod = require("../sendTCPActionFailedClientSaga");
	});
	// biome-ignore lint/style/noNonNullAssertion: assigned synchronously above
	return mod!.sendTCPActionFailedClientSaga;
};

const socketA = { id: "a" } as never;
const socketB = { id: "b" } as never;

const buildFailedAction = (socket: unknown) =>
	sendTCPActionFailed({
		socket,
		action: { type: "some/action" },
		messageId: "m1",
		type: "socket-destroyed",
	});

beforeEach(() => {
	jest.useFakeTimers();
	mockGetTCPServerSocket.mockReset();
});

afterEach(() => {
	jest.useRealTimers();
});

describe("sendTCPActionFailedClientSaga", () => {
	it("restarts the client and toasts when everything lines up", async () => {
		const saga = loadSaga();
		mockGetTCPServerSocket.mockReturnValue(socketA);

		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setHostIP("192.168.1.10"));
		state = reducer(state, setGameStatus("playing"));
		state = reducer(state, setCurrentRoute(routes.board));
		const tester = createSagaTester({ reducer, state });
		tester.run(saga);

		tester.dispatch(buildFailedAction(socketA));
		await jest.advanceTimersByTimeAsync(0);

		expect(tester.ofType(restartTCPClient.type)).toHaveLength(1);
		expect(tester.ofType(sendNotification.type)).toHaveLength(1);
	});

	it("does nothing for a host role", async () => {
		const saga = loadSaga();
		mockGetTCPServerSocket.mockReturnValue(socketA);

		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("host"));
		state = reducer(state, setHostIP("192.168.1.10"));
		state = reducer(state, setGameStatus("playing"));
		state = reducer(state, setCurrentRoute(routes.board));
		const tester = createSagaTester({ reducer, state });
		tester.run(saga);

		tester.dispatch(buildFailedAction(socketA));
		await jest.advanceTimersByTimeAsync(0);

		expect(tester.ofType(restartTCPClient.type)).toHaveLength(0);
	});

	it("ignores a failure from a stale socket that is no longer the active one", async () => {
		const saga = loadSaga();
		mockGetTCPServerSocket.mockReturnValue(socketB); // active socket differs from the failed one

		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setHostIP("192.168.1.10"));
		state = reducer(state, setGameStatus("playing"));
		state = reducer(state, setCurrentRoute(routes.board));
		const tester = createSagaTester({ reducer, state });
		tester.run(saga);

		tester.dispatch(buildFailedAction(socketA));
		await jest.advanceTimersByTimeAsync(0);

		expect(tester.ofType(restartTCPClient.type)).toHaveLength(0);
	});

	it("does nothing when hostIP is unset", async () => {
		const saga = loadSaga();
		mockGetTCPServerSocket.mockReturnValue(socketA);

		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setGameStatus("playing"));
		state = reducer(state, setCurrentRoute(routes.board));
		const tester = createSagaTester({ reducer, state });
		tester.run(saga);

		tester.dispatch(buildFailedAction(socketA));
		await jest.advanceTimersByTimeAsync(0);

		expect(tester.ofType(restartTCPClient.type)).toHaveLength(0);
	});

	it("does nothing on the home route regardless of everything else (delegated to selectClientReconnectAllowed)", async () => {
		const saga = loadSaga();
		mockGetTCPServerSocket.mockReturnValue(socketA);

		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setHostIP("192.168.1.10"));
		state = reducer(state, setGameStatus("playing"));
		// default currentRoute ("/") IS routes.home — no explicit setCurrentRoute needed
		const tester = createSagaTester({ reducer, state });
		tester.run(saga);

		tester.dispatch(buildFailedAction(socketA));
		await jest.advanceTimersByTimeAsync(0);

		expect(tester.ofType(restartTCPClient.type)).toHaveLength(0);
	});

	/**
	 * FIXED 2026-09-28 (was a real asymmetry, see audit report): this saga now delegates to
	 * `selectClientReconnectAllowed`, the same eligibility check a dropped socket uses. A failed
	 * send while still in the lobby (gameStatus "initial" on the startMultiplayer route) now retries
	 * just like a dropped socket there would, instead of giving up unconditionally.
	 */
	it("retries when gameStatus is 'initial' on the lobby route (matches the reconnect-on-close carve-out)", async () => {
		const saga = loadSaga();
		mockGetTCPServerSocket.mockReturnValue(socketA);

		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setHostIP("192.168.1.10"));
		state = reducer(state, setGameStatus("initial"));
		state = reducer(state, setCurrentRoute(routes.startMultiplayer));
		const tester = createSagaTester({ reducer, state });
		tester.run(saga);

		tester.dispatch(buildFailedAction(socketA));
		await jest.advanceTimersByTimeAsync(0);

		expect(tester.ofType(restartTCPClient.type)).toHaveLength(1);
	});

	it("still gives up when gameStatus is 'initial' off the lobby route", async () => {
		const saga = loadSaga();
		mockGetTCPServerSocket.mockReturnValue(socketA);

		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setHostIP("192.168.1.10"));
		state = reducer(state, setGameStatus("initial"));
		state = reducer(state, setCurrentRoute(routes.settings));
		const tester = createSagaTester({ reducer, state });
		tester.run(saga);

		tester.dispatch(buildFailedAction(socketA));
		await jest.advanceTimersByTimeAsync(0);

		expect(tester.ofType(restartTCPClient.type)).toHaveLength(0);
	});

	it("throttles the toast to one per 8s but still restarts every time", async () => {
		const saga = loadSaga();
		mockGetTCPServerSocket.mockReturnValue(socketA);

		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setHostIP("192.168.1.10"));
		state = reducer(state, setGameStatus("playing"));
		state = reducer(state, setCurrentRoute(routes.board));
		const tester = createSagaTester({ reducer, state });
		tester.run(saga);

		tester.dispatch(buildFailedAction(socketA));
		await jest.advanceTimersByTimeAsync(0);
		expect(tester.ofType(sendNotification.type)).toHaveLength(1);
		expect(tester.ofType(restartTCPClient.type)).toHaveLength(1);

		tester.dispatch(buildFailedAction(socketA));
		await jest.advanceTimersByTimeAsync(0);
		expect(tester.ofType(sendNotification.type)).toHaveLength(1);
		expect(tester.ofType(restartTCPClient.type)).toHaveLength(2);

		await jest.advanceTimersByTimeAsync(8_000);

		tester.dispatch(buildFailedAction(socketA));
		await jest.advanceTimersByTimeAsync(0);
		expect(tester.ofType(sendNotification.type)).toHaveLength(2);
		expect(tester.ofType(restartTCPClient.type)).toHaveLength(3);
	});
});
