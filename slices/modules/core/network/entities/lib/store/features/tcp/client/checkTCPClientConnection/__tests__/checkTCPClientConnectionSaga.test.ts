import { restartTCPClient } from "@modules/core/network/entities/lib/store/features/tcp/client/restartTCPClient";
import {
	network,
	sendNetworkKeepAlive,
	setClientRunning,
	setHostIP,
	setNetworkRole,
} from "@modules/core/network/shared/lib";
import { router, setCurrentRoute } from "@modules/core/router/shared/lib";
import { game, setGameStatus } from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { stateAfter } from "@shared/lib/test/stateAfter";
import { checkTCPClientConnection } from "../checkTCPClientConnection";
import { checkTCPClientConnectionSaga } from "../checkTCPClientConnectionSaga";

const socket = { destroyed: false };
const mockGetTCPServerSocket = jest.fn();
jest.mock("@modules/core/network/shared/lib", () => {
	const actual = jest.requireActual("@modules/core/network/shared/lib");
	return {
		...actual,
		getTCPServerSocket: () => mockGetTCPServerSocket(),
	};
});

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
	router: router.reducer,
});

const buildAllowedState = () => {
	const state = stateAfter(
		reducer,
		setNetworkRole("client"),
		setHostIP("192.168.1.10"),
		setGameStatus("playing"),
		setCurrentRoute(routes.board),
	);
	return state;
};

beforeEach(() => {
	mockGetTCPServerSocket.mockReset();
});

describe("checkTCPClientConnectionSaga", () => {
	it("does nothing when reconnect is not allowed (e.g. on the home route)", () => {
		let state = buildAllowedState();
		state = reducer(state, setCurrentRoute(routes.home));
		const tester = createSagaTester({ reducer, state });
		tester.run(checkTCPClientConnectionSaga);

		tester.dispatch(checkTCPClientConnection());

		expect(tester.ofType(restartTCPClient.type)).toHaveLength(0);
		expect(tester.ofType(sendNetworkKeepAlive.type)).toHaveLength(0);
	});

	it("restarts when clientRunning is false and there is no live socket", () => {
		let state = buildAllowedState();
		state = reducer(state, setClientRunning(false));
		mockGetTCPServerSocket.mockReturnValue(undefined);
		const tester = createSagaTester({ reducer, state });
		tester.run(checkTCPClientConnectionSaga);

		tester.dispatch(checkTCPClientConnection());

		expect(tester.ofType(restartTCPClient.type)).toHaveLength(1);
	});

	it("does not restart when clientRunning is false but a live socket already exists", () => {
		let state = buildAllowedState();
		state = reducer(state, setClientRunning(false));
		mockGetTCPServerSocket.mockReturnValue(socket);
		const tester = createSagaTester({ reducer, state });
		tester.run(checkTCPClientConnectionSaga);

		tester.dispatch(checkTCPClientConnection());

		expect(tester.ofType(restartTCPClient.type)).toHaveLength(0);
	});

	it("restarts when clientRunning is true but the socket is dead (e.g. after HMR)", () => {
		let state = buildAllowedState();
		state = reducer(state, setClientRunning(true));
		mockGetTCPServerSocket.mockReturnValue({ destroyed: true });
		const tester = createSagaTester({ reducer, state });
		tester.run(checkTCPClientConnectionSaga);

		tester.dispatch(checkTCPClientConnection());

		expect(tester.ofType(restartTCPClient.type)).toHaveLength(1);
	});

	it("sends a keep-alive ping when running with a live socket", () => {
		let state = buildAllowedState();
		state = reducer(state, setClientRunning(true));
		mockGetTCPServerSocket.mockReturnValue(socket);
		const tester = createSagaTester({ reducer, state });
		tester.run(checkTCPClientConnectionSaga);

		tester.dispatch(checkTCPClientConnection());

		expect(tester.ofType(restartTCPClient.type)).toHaveLength(0);
		expect(tester.ofType(sendNetworkKeepAlive.type)).toHaveLength(1);
	});
});
