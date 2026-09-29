import { restartTCPClient } from "@modules/core/network/entities/lib/store/features/tcp/client/restartTCPClient";
import { restartTCPClientSaga } from "@modules/core/network/entities/lib/store/features/tcp/client/restartTCPClient/restartTCPClientSaga";
import { setTCPClientSocket } from "@modules/core/network/shared/lib/logic/tcp/socket/server";
import {
	startTCPClient,
	stopTCPClient,
	tcpClientSocketClosed,
} from "@modules/core/network/shared/lib/store/actions/tcp/tcpClient";
import { tcpServerSocketClosed } from "@modules/core/network/shared/lib/store/actions/tcp/tcpServer";
import {
	network,
	setHostIP,
	setNetworkRole,
} from "@modules/core/network/shared/lib/store/network";
import {
	addNetworkClient,
	networkClient,
} from "@modules/core/network/shared/lib/store/networkClient";
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
import { reconnectTCPClientSaga } from "../client/reconnect-tcp-client/reconnectTCPClientSaga";
import { disconnectTCPClientSaga } from "../server/disconnect-tcp-client/disconnectTCPClientSaga";

// Cross-cutting scenario tests composing the individual sagas already covered in:
//  - reconnect-tcp-client/__tests__/reconnectTCPClientSaga.test.ts
//  - entities/.../restartTCPClient/__tests__/restartTCPClientSaga.test.ts
//  - disconnect-tcp-client/__tests__/disconnectTCPClientSaga.test.ts
// Real reducers are used throughout (no mocked store) so these assert genuine integration
// behavior, not just that each saga in isolation dispatches the right action.

// restartTCPClientSaga throttles with a module-level timestamp
useFreshFakeClock();

describe("full client-side disconnect/reconnect flow", () => {
	const reducer = combineReducers({
		network: network.reducer,
		game: game.reducer,
		router: router.reducer,
	});

	it("a mid-game socket close cascades: reconnect allowed -> restartTCPClient -> stop+start with the same host", async () => {
		const state = stateAfter(
			reducer,
			setNetworkRole("client"),
			setHostIP("192.168.1.42"),
			setGameStatus("playing"),
			setCurrentRoute(routes.board),
		);

		const tester = createSagaTester({ reducer, state });
		tester.run(reconnectTCPClientSaga);
		tester.run(restartTCPClientSaga);

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
		const reducer = combineReducers({ networkClient: networkClient.reducer });

		const socketAlice = { destroy: jest.fn() };
		const socketBob = { destroy: jest.fn() };
		setTCPClientSocket("alice", socketAlice as never);
		setTCPClientSocket("bob", socketBob as never);

		let state = reducer(undefined, { type: "@@init" });
		state = reducer(
			state,
			addNetworkClient({ id: "alice", nickname: "Alice" }),
		);
		state = reducer(state, addNetworkClient({ id: "bob", nickname: "Bob" }));

		const tester = createSagaTester({ reducer, state });
		tester.run(disconnectTCPClientSaga);

		tester.dispatch(tcpServerSocketClosed({ socket: socketAlice as never }));

		expect(tester.getState().networkClient.ids).toEqual(["bob"]);
	});
});
