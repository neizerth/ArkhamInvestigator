import { restartTCPClient } from "@modules/core/network/entities/lib/store/features/tcp/client/restartTCPClient";
import {
	network,
	setHostIP,
	setNetworkRole,
	tcpClientSocketClosed,
} from "@modules/core/network/shared/lib";
import { router, setCurrentRoute } from "@modules/core/router/shared/lib";
import { game, setGameStatus } from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { reconnectTCPClientSaga } from "../reconnectTCPClientSaga";

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
	router: router.reducer,
});

describe("reconnectTCPClientSaga", () => {
	it("dispatches restartTCPClient when a socket closes and reconnect is allowed", () => {
		const tester = createSagaTester({ reducer });
		tester.dispatch(setNetworkRole("client"));
		tester.dispatch(setHostIP("192.168.1.10"));
		tester.dispatch(setGameStatus("started" as never));
		tester.dispatch(setCurrentRoute(routes.board as never));

		tester.run(reconnectTCPClientSaga);
		tester.dispatch(tcpClientSocketClosed());

		expect(tester.ofType(restartTCPClient.type)).toHaveLength(1);
	});

	it("does nothing when reconnect is not allowed (e.g. on the home route)", () => {
		const tester = createSagaTester({ reducer });
		tester.dispatch(setNetworkRole("client"));
		tester.dispatch(setHostIP("192.168.1.10"));
		tester.dispatch(setGameStatus("started" as never));
		tester.dispatch(setCurrentRoute(routes.home as never));

		tester.run(reconnectTCPClientSaga);
		tester.dispatch(tcpClientSocketClosed());

		expect(tester.ofType(restartTCPClient.type)).toHaveLength(0);
	});

	it("does nothing for a host (not a client)", () => {
		const tester = createSagaTester({ reducer });
		tester.dispatch(setNetworkRole("host"));
		tester.dispatch(setHostIP("192.168.1.10"));
		tester.dispatch(setGameStatus("started" as never));
		tester.dispatch(setCurrentRoute(routes.board as never));

		tester.run(reconnectTCPClientSaga);
		tester.dispatch(tcpClientSocketClosed());

		expect(tester.ofType(restartTCPClient.type)).toHaveLength(0);
	});
});
