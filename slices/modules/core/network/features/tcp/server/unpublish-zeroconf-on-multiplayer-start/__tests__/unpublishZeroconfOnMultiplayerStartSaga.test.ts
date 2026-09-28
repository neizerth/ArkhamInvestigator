import {
	network,
	setNetworkRole,
	stopTCPServerZeroconf,
} from "@modules/core/network/shared/lib";
import { startGame } from "@modules/game/entities/startGame";
import { game, setGameMode } from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { unpublishZeroconfOnMultiplayerStartSaga } from "../unpublishZeroconfOnMultiplayerStartSaga";

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
});

describe("unpublishZeroconfOnMultiplayerStartSaga", () => {
	it("unpublishes Zeroconf when the host starts a multiplayer game", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setGameMode("multiplayer" as never));
		state = reducer(state, setNetworkRole("host"));
		const tester = createSagaTester({ reducer, state });
		tester.run(unpublishZeroconfOnMultiplayerStartSaga);

		tester.dispatch(startGame());

		expect(tester.ofType(stopTCPServerZeroconf.type)).toHaveLength(1);
	});

	it("does nothing for a client role", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setGameMode("multiplayer" as never));
		state = reducer(state, setNetworkRole("client"));
		const tester = createSagaTester({ reducer, state });
		tester.run(unpublishZeroconfOnMultiplayerStartSaga);

		tester.dispatch(startGame());

		expect(tester.ofType(stopTCPServerZeroconf.type)).toHaveLength(0);
	});

	it("does nothing for a single-player game", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setGameMode("single" as never));
		state = reducer(state, setNetworkRole("host"));
		const tester = createSagaTester({ reducer, state });
		tester.run(unpublishZeroconfOnMultiplayerStartSaga);

		tester.dispatch(startGame());

		expect(tester.ofType(stopTCPServerZeroconf.type)).toHaveLength(0);
	});
});
