import {
	network,
	networkClient,
	selectAllNetworkClients,
	selectClientRunning,
	selectHostIP,
	selectHostRunning,
	setClientRunning,
	setHostIP,
	setHostRunning,
	upsertNetworkClient,
} from "@modules/core/network/shared/lib";
import { startNewGame } from "@modules/game/entities/startNewGame";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { stateAfter } from "@shared/lib/test/stateAfter";
import { clearNetworkOnNewGameSaga } from "../clearNetworkOnNewGameSaga";

const reducer = combineReducers({
	network: network.reducer,
	networkClient: networkClient.reducer,
});

describe("clearNetworkOnNewGameSaga", () => {
	it("resets running flags, hostIP, and the client roster on every startNewGame", () => {
		const state = stateAfter(
			reducer,
			setHostRunning(true),
			setClientRunning(true),
			setHostIP("192.168.1.10"),
			upsertNetworkClient({ id: "c1", nickname: "A" }),
		);

		const tester = createSagaTester({ reducer, state });
		tester.run(clearNetworkOnNewGameSaga);

		tester.dispatch(startNewGame({ type: "single" }));

		expect(selectHostRunning(tester.getState())).toBe(false);
		expect(selectClientRunning(tester.getState())).toBe(false);
		expect(selectHostIP(tester.getState())).toBeNull();
		expect(
			selectAllNetworkClients(
				tester.getState() as Parameters<typeof selectAllNetworkClients>[0],
			),
		).toHaveLength(0);
	});

	it("resets again for a subsequent startNewGame (e.g. single -> multiplayer)", () => {
		const state = stateAfter(reducer, setHostIP("192.168.1.10"));
		const tester = createSagaTester({ reducer, state });
		tester.run(clearNetworkOnNewGameSaga);

		tester.dispatch(startNewGame({ type: "single" }));
		expect(selectHostIP(tester.getState())).toBeNull();

		// simulate the host setting a fresh IP after the first reset, then starting yet another game
		const nextState = reducer(tester.getState(), setHostIP("10.0.0.5"));
		const tester2 = createSagaTester({ reducer, state: nextState });
		tester2.run(clearNetworkOnNewGameSaga);
		tester2.dispatch(startNewGame({ type: "multiplayer" }));

		expect(selectHostIP(tester2.getState())).toBeNull();
	});
});
