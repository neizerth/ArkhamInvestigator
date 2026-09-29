import {
	network,
	setHostIP,
	setNetworkRole,
	startTCPClient,
} from "@modules/core/network/shared/lib";
import { resumeGame } from "@modules/game/entities/resumeGame";
import { game, setGameStatus } from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { stateAfter } from "@shared/lib/test/stateAfter";
import { runTCPClientOnResumeSaga } from "../runTCPClientOnResumeSaga";

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
});

describe("runTCPClientOnResumeSaga", () => {
	it("restarts the TCP client on resume when it's a client mid-game", () => {
		const state = stateAfter(
			reducer,
			setNetworkRole("client"),
			setHostIP("192.168.1.10"),
			setGameStatus("playing"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPClientOnResumeSaga);

		tester.dispatch(resumeGame());

		expect(tester.ofType(startTCPClient.type)).toHaveLength(1);
		expect(
			(
				tester.ofType(startTCPClient.type)[0] as ReturnType<
					typeof startTCPClient
				>
			).payload,
		).toEqual({ host: "192.168.1.10" });
	});

	it("does nothing for a host role", () => {
		const state = stateAfter(
			reducer,
			setNetworkRole("host"),
			setHostIP("192.168.1.10"),
			setGameStatus("playing"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPClientOnResumeSaga);

		tester.dispatch(resumeGame());

		expect(tester.ofType(startTCPClient.type)).toHaveLength(0);
	});

	it("does nothing when gameStatus is 'initial' (no game to resume into)", () => {
		const state = stateAfter(
			reducer,
			setNetworkRole("client"),
			setHostIP("192.168.1.10"),
			setGameStatus("initial"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPClientOnResumeSaga);

		tester.dispatch(resumeGame());

		expect(tester.ofType(startTCPClient.type)).toHaveLength(0);
	});

	it("does nothing when hostIP is unset", () => {
		const state = stateAfter(
			reducer,
			setNetworkRole("client"),
			setGameStatus("playing"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPClientOnResumeSaga);

		tester.dispatch(resumeGame());

		expect(tester.ofType(startTCPClient.type)).toHaveLength(0);
	});
});
