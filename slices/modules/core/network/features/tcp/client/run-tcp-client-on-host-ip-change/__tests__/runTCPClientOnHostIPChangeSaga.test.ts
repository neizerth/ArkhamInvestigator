import { clearNetworkOnNewGameSaga } from "@modules/core/network/features/clear-network-on-new-game/clearNetworkOnNewGameSaga";
import {
	network,
	setHostIP,
	startTCPClient,
} from "@modules/core/network/shared/lib";
import { startNewGame } from "@modules/game/entities/startNewGame";
import { game } from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { runTCPClientOnHostIPChangeSaga } from "../runTCPClientOnHostIPChangeSaga";

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
});

/**
 * startTCPClient is only ever dispatched from here, gated on selectNetworkRole === "client".
 * Single-player never sets a network role. Runs together with clearNetworkOnNewGameSaga (which
 * resets hostIP to null on every startNewGame) to reproduce the real single-player chain: the
 * setHostIP(null) that fires on a new game must still not slip past the role gate.
 */
describe("runTCPClientOnHostIPChangeSaga - single-player stays network-off", () => {
	it("does not dispatch startTCPClient when a single-player game starts (networkRole stays null)", () => {
		const tester = createSagaTester({ reducer });
		tester.run(runTCPClientOnHostIPChangeSaga);
		tester.run(clearNetworkOnNewGameSaga);

		tester.dispatch(startNewGame({ type: "single" }));

		expect(tester.ofType(setHostIP.type).length).toBeGreaterThan(0);
		expect(tester.ofType(startTCPClient.type)).toHaveLength(0);
	});

	it("does not dispatch startTCPClient on a direct setHostIP when networkRole is null", () => {
		const tester = createSagaTester({ reducer });
		tester.run(runTCPClientOnHostIPChangeSaga);

		tester.dispatch(setHostIP("192.168.1.10"));

		expect(tester.ofType(startTCPClient.type)).toHaveLength(0);
	});
});
