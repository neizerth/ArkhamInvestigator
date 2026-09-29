import {
	network,
	setNetworkRole,
	startTCPServer,
} from "@modules/core/network/shared/lib";
import { resumeGame } from "@modules/game/entities/resumeGame";
import { game, setGameMode, setGameStatus } from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { stateAfter } from "@shared/lib/test/stateAfter";
import { runTCPServerOnAppResumeSaga } from "../runTCPServerOnAppResumeSaga";

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
});

describe("runTCPServerOnAppResumeSaga", () => {
	it("restarts the TCP server on resume for a host mid-multiplayer-game", () => {
		const state = stateAfter(
			reducer,
			setNetworkRole("host"),
			setGameMode("multiplayer" as never),
			setGameStatus("playing"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPServerOnAppResumeSaga);

		tester.dispatch(resumeGame());

		expect(tester.ofType(startTCPServer.type)).toHaveLength(1);
	});

	it("does nothing for a client role", () => {
		const state = stateAfter(
			reducer,
			setNetworkRole("client"),
			setGameMode("multiplayer" as never),
			setGameStatus("playing"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPServerOnAppResumeSaga);

		tester.dispatch(resumeGame());

		expect(tester.ofType(startTCPServer.type)).toHaveLength(0);
	});

	it("does nothing for a single-player game mode", () => {
		const state = stateAfter(
			reducer,
			setNetworkRole("host"),
			setGameMode("single" as never),
			setGameStatus("playing"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPServerOnAppResumeSaga);

		tester.dispatch(resumeGame());

		expect(tester.ofType(startTCPServer.type)).toHaveLength(0);
	});

	it("does nothing when gameStatus is 'initial'", () => {
		const state = stateAfter(
			reducer,
			setNetworkRole("host"),
			setGameMode("multiplayer" as never),
			setGameStatus("initial"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPServerOnAppResumeSaga);

		tester.dispatch(resumeGame());

		expect(tester.ofType(startTCPServer.type)).toHaveLength(0);
	});
});
