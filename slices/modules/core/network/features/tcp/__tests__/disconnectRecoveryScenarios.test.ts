import type * as RestartTCPClientSaga from "@modules/core/network/entities/lib/store/features/tcp/client/restartTCPClient/restartTCPClientSaga";
import type * as NetworkClientStore from "@modules/core/network/shared/lib/store/networkClient";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import type * as ReconnectTCPClientSaga from "../client/reconnect-tcp-client/reconnectTCPClientSaga";

// Cross-cutting scenario tests composing the individual sagas already covered in:
//  - reconnect-tcp-client/__tests__/reconnectTCPClientSaga.test.ts
//  - entities/.../restartTCPClient/__tests__/restartTCPClientSaga.test.ts
//  - disconnect-tcp-client/__tests__/disconnectTCPClientSaga.test.ts
// Real reducers are used throughout (no mocked store) so these assert genuine integration
// behavior, not just that each saga in isolation dispatches the right action.

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);
jest.mock("@modules/core/log/shared/config", () => ({
	tcpLog: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));
// See restartTCPClientSaga.test.ts: the full `@modules/core/network/shared/lib` barrel pulls in
// `@shared/config/device`, which breaks under `jest.isolateModules`. Keep it to what these two
// sagas need.
jest.mock("@modules/core/network/shared/lib", () => ({
	...jest.requireActual("@modules/core/network/shared/lib/store/network"),
	...jest.requireActual(
		"@modules/core/network/shared/lib/store/actions/tcp/tcpClient",
	),
	...jest.requireActual(
		"@modules/core/network/shared/lib/store/actions/tcp/tcpServer",
	),
	...jest.requireActual(
		"@modules/core/network/shared/lib/logic/tcp/socket/server",
	),
	selectClientReconnectAllowed: (state: {
		network: { networkRole: string | null; hostIP: string | null };
	}) => state.network.networkRole === "client" && Boolean(state.network.hostIP),
}));

const { network, setHostIP, setNetworkRole } = jest.requireActual(
	"@modules/core/network/shared/lib/store/network",
);
const { startTCPClient, stopTCPClient, tcpClientSocketClosed } =
	jest.requireActual(
		"@modules/core/network/shared/lib/store/actions/tcp/tcpClient",
	);
const { restartTCPClient } = jest.requireActual(
	"@modules/core/network/entities/lib/store/features/tcp/client/restartTCPClient",
);

const reducer = combineReducers({ network: network.reducer });

const loadClientSagas = () => {
	let reconnectMod: typeof ReconnectTCPClientSaga | undefined;
	let restartMod: typeof RestartTCPClientSaga | undefined;
	jest.isolateModules(() => {
		reconnectMod = require("../client/reconnect-tcp-client/reconnectTCPClientSaga");
		restartMod = require("@modules/core/network/entities/lib/store/features/tcp/client/restartTCPClient/restartTCPClientSaga");
	});
	if (!reconnectMod || !restartMod) {
		throw new Error("TCP client sagas were not loaded");
	}
	return {
		reconnectSaga: reconnectMod.reconnectTCPClientSaga,
		restartSaga: restartMod.restartTCPClientSaga,
	};
};

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.useRealTimers();
});

describe("full client-side disconnect/reconnect flow", () => {
	it("a mid-game socket close cascades: reconnect allowed -> restartTCPClient -> stop+start with the same host", async () => {
		const { reconnectSaga, restartSaga } = loadClientSagas();

		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setHostIP("192.168.1.42"));

		const tester = createSagaTester({ reducer, state });
		tester.run(reconnectSaga);
		tester.run(restartSaga);

		tester.dispatch(tcpClientSocketClosed());
		await jest.advanceTimersByTimeAsync(100);

		expect(tester.actions.map((a) => a.type)).toEqual([
			tcpClientSocketClosed.type,
			restartTCPClient.type,
			stopTCPClient.type,
			startTCPClient.type,
		]);
		const startAction = tester.ofType(startTCPClient.type)[0] as ReturnType<
			typeof startTCPClient
		>;
		expect(startAction.payload).toEqual({ host: "192.168.1.42" });
	});
});

describe("full host-side disconnect flow", () => {
	it("a client socket close removes exactly that client from the real networkClient roster", () => {
		const { networkClient, addNetworkClient } = jest.requireActual<
			typeof NetworkClientStore
		>("@modules/core/network/shared/lib/store/networkClient");
		const { setTCPClientSocket } = jest.requireActual(
			"@modules/core/network/shared/lib/logic/tcp/socket/server",
		);
		const {
			disconnectTCPClientSaga,
		} = require("../server/disconnect-tcp-client/disconnectTCPClientSaga");
		const { tcpServerSocketClosed } = jest.requireActual(
			"@modules/core/network/shared/lib/store/actions/tcp/tcpServer",
		);

		const hostReducer = combineReducers({
			networkClient: networkClient.reducer,
		});

		const socketAlice = { destroy: jest.fn() };
		const socketBob = { destroy: jest.fn() };
		setTCPClientSocket("alice", socketAlice as never);
		setTCPClientSocket("bob", socketBob as never);

		let state = hostReducer(undefined, { type: "@@init" });
		state = hostReducer(
			state,
			addNetworkClient({ id: "alice", nickname: "Alice" }),
		);
		state = hostReducer(
			state,
			addNetworkClient({ id: "bob", nickname: "Bob" }),
		);

		const tester = createSagaTester({ reducer: hostReducer, state });
		tester.run(disconnectTCPClientSaga);

		tester.dispatch(tcpServerSocketClosed({ socket: socketAlice }));

		expect(tester.getState().networkClient.ids).toEqual(["bob"]);
	});
});
