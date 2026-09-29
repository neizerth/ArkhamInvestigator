import {
	network,
	networkClient,
	selectAllNetworkClients,
	selectHostIP,
	setHostIP,
	upsertNetworkClient,
} from "@modules/core/network/shared/lib";
import { router, setCurrentRoute } from "@modules/core/router/shared/lib";
import {
	game,
	selectGameStatus,
	setGameStatus,
} from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { stateAfter } from "@shared/lib/test/stateAfter";
import { initGameStatusOnMultiplayerRouteSaga } from "../initGameStatusOnMultiplayerRouteSaga";

const reducer = combineReducers({
	network: network.reducer,
	networkClient: networkClient.reducer,
	game: game.reducer,
	router: router.reducer,
});

describe("initGameStatusOnMultiplayerRouteSaga", () => {
	it("resets clients, hostIP, and gameStatus on entering the multiplayer screen", () => {
		const state = stateAfter(
			reducer,
			setHostIP("192.168.1.10"),
			upsertNetworkClient({ id: "c1", nickname: "A" }),
			setGameStatus("playing"),
		);

		const tester = createSagaTester({ reducer, state });
		tester.run(initGameStatusOnMultiplayerRouteSaga);

		tester.dispatch(setCurrentRoute(routes.startMultiplayer));

		expect(selectHostIP(tester.getState())).toBeNull();
		expect(
			selectAllNetworkClients(
				tester.getState() as Parameters<typeof selectAllNetworkClients>[0],
			),
		).toHaveLength(0);
		expect(selectGameStatus(tester.getState())).toBe("initial");
	});

	it("does nothing for any other route", () => {
		const state = stateAfter(
			reducer,
			setHostIP("192.168.1.10"),
			setGameStatus("playing"),
		);

		const tester = createSagaTester({ reducer, state });
		tester.run(initGameStatusOnMultiplayerRouteSaga);

		tester.dispatch(setCurrentRoute(routes.board));

		expect(selectHostIP(tester.getState())).toBe("192.168.1.10");
		expect(selectGameStatus(tester.getState())).toBe("playing");
	});
});
