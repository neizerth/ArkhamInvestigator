import {
	network,
	setNetworkRole,
	startTCPServer,
} from "@modules/core/network/shared/lib";
import { resumeGame } from "@modules/game/entities/resumeGame";
import { game, setGameMode, setGameStatus } from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { runTCPServerOnAppResumeSaga } from "../runTCPServerOnAppResumeSaga";

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
});

describe("runTCPServerOnAppResumeSaga", () => {
	it("restarts the TCP server on resume for a host mid-multiplayer-game", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("host"));
		state = reducer(state, setGameMode("multiplayer" as never));
		state = reducer(state, setGameStatus("playing"));
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPServerOnAppResumeSaga);

		tester.dispatch(resumeGame());

		expect(tester.ofType(startTCPServer.type)).toHaveLength(1);
	});

	it("does nothing for a client role", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setGameMode("multiplayer" as never));
		state = reducer(state, setGameStatus("playing"));
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPServerOnAppResumeSaga);

		tester.dispatch(resumeGame());

		expect(tester.ofType(startTCPServer.type)).toHaveLength(0);
	});

	it("does nothing for a single-player game mode", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("host"));
		state = reducer(state, setGameMode("single" as never));
		state = reducer(state, setGameStatus("playing"));
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPServerOnAppResumeSaga);

		tester.dispatch(resumeGame());

		expect(tester.ofType(startTCPServer.type)).toHaveLength(0);
	});

	it("does nothing when gameStatus is 'initial'", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("host"));
		state = reducer(state, setGameMode("multiplayer" as never));
		state = reducer(state, setGameStatus("initial"));
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPServerOnAppResumeSaga);

		tester.dispatch(resumeGame());

		expect(tester.ofType(startTCPServer.type)).toHaveLength(0);
	});
});
