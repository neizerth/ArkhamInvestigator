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
import { runTCPClientOnResumeSaga } from "../runTCPClientOnResumeSaga";

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);
jest.mock("@modules/core/log/shared/config", () => ({
	log: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
	tcpLog: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
});

describe("runTCPClientOnResumeSaga", () => {
	it("restarts the TCP client on resume when it's a client mid-game", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setHostIP("192.168.1.10"));
		state = reducer(state, setGameStatus("playing"));
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
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("host"));
		state = reducer(state, setHostIP("192.168.1.10"));
		state = reducer(state, setGameStatus("playing"));
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPClientOnResumeSaga);

		tester.dispatch(resumeGame());

		expect(tester.ofType(startTCPClient.type)).toHaveLength(0);
	});

	it("does nothing when gameStatus is 'initial' (no game to resume into)", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setHostIP("192.168.1.10"));
		state = reducer(state, setGameStatus("initial"));
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPClientOnResumeSaga);

		tester.dispatch(resumeGame());

		expect(tester.ofType(startTCPClient.type)).toHaveLength(0);
	});

	it("does nothing when hostIP is unset", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setGameStatus("playing"));
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPClientOnResumeSaga);

		tester.dispatch(resumeGame());

		expect(tester.ofType(startTCPClient.type)).toHaveLength(0);
	});
});
