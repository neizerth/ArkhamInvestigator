import {
	network,
	setNetworkRole,
	stopTCPServerZeroconf,
} from "@modules/core/network/shared/lib";
import { startGame } from "@modules/game/entities/startGame";
import { game, setGameMode } from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { stateAfter } from "@shared/lib/test/stateAfter";
import { unpublishZeroconfOnMultiplayerStartSaga } from "../unpublishZeroconfOnMultiplayerStartSaga";

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
});

describe("unpublishZeroconfOnMultiplayerStartSaga", () => {
	it("unpublishes Zeroconf when the host starts a multiplayer game", () => {
		const state = stateAfter(
			reducer,
			setGameMode("multiplayer" as never),
			setNetworkRole("host"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(unpublishZeroconfOnMultiplayerStartSaga);

		tester.dispatch(startGame());

		expect(tester.ofType(stopTCPServerZeroconf.type)).toHaveLength(1);
	});

	it("does nothing for a client role", () => {
		const state = stateAfter(
			reducer,
			setGameMode("multiplayer" as never),
			setNetworkRole("client"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(unpublishZeroconfOnMultiplayerStartSaga);

		tester.dispatch(startGame());

		expect(tester.ofType(stopTCPServerZeroconf.type)).toHaveLength(0);
	});

	it("does nothing for a single-player game", () => {
		const state = stateAfter(
			reducer,
			setGameMode("single" as never),
			setNetworkRole("host"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(unpublishZeroconfOnMultiplayerStartSaga);

		tester.dispatch(startGame());

		expect(tester.ofType(stopTCPServerZeroconf.type)).toHaveLength(0);
	});
});
