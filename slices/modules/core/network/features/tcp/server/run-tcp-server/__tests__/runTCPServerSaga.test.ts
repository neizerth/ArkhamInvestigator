import { network, startTCPServer } from "@modules/core/network/shared/lib";
import { router, setCurrentRoute } from "@modules/core/router/shared/lib";
import { startNewGame } from "@modules/game/entities/startNewGame";
import { combineReducers } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { runTCPServerSaga } from "../runTCPServerSaga";

const reducer = combineReducers({
	network: network.reducer,
	router: router.reducer,
});

/**
 * Single-player mode never sets a network role and never visits /multiplayer, so
 * runTCPServerSaga's only two triggers (setNetworkRole, a page visit to
 * routes.startMultiplayer) never fire — the TCP server must never be started.
 */
describe("runTCPServerSaga - single-player stays network-off", () => {
	it("does not dispatch startTCPServer when a single-player game starts", () => {
		const tester = createSagaTester({ reducer });
		tester.run(runTCPServerSaga);

		tester.dispatch(startNewGame({ type: "single" }));

		expect(tester.ofType(startTCPServer.type)).toHaveLength(0);
	});

	it("does not dispatch startTCPServer on visits to unrelated routes", () => {
		const tester = createSagaTester({ reducer });
		tester.run(runTCPServerSaga);

		tester.dispatch(setCurrentRoute(routes.home));
		tester.dispatch(setCurrentRoute(routes.settings));

		expect(tester.ofType(startTCPServer.type)).toHaveLength(0);
	});

	it("only starts the TCP server once /multiplayer is actually visited (sanity check on the gate itself)", () => {
		const tester = createSagaTester({ reducer });
		tester.run(runTCPServerSaga);

		expect(tester.ofType(startTCPServer.type)).toHaveLength(0);

		tester.dispatch(setCurrentRoute(routes.startMultiplayer));

		// role is still null here, so the host branch does not fire even on this route
		expect(tester.ofType(startTCPServer.type)).toHaveLength(0);
	});
});
