import { network, setNetworkRole } from "@modules/core/network/shared/lib";
import { game, setGameMode, setGameStatus } from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { selectIsClientGame } from "../selectIsClientGame";
import { selectIsClientPlaying } from "../selectIsClientPlaying";
import { selectIsHostGame } from "../selectIsHostGame";

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
});

const buildState = (
	role: "host" | "client" | null,
	mode: "single" | "multiplayer",
) => {
	let state = reducer(undefined, { type: "@@INIT" });
	state = reducer(state, setNetworkRole(role));
	state = reducer(state, setGameMode(mode));
	return state;
};

describe("selectIsClientGame", () => {
	it("is true only for a multiplayer game with the client role", () => {
		expect(selectIsClientGame(buildState("client", "multiplayer"))).toBe(true);
	});

	it("is false for host role or singleplayer mode", () => {
		expect(selectIsClientGame(buildState("host", "multiplayer"))).toBe(false);
		expect(selectIsClientGame(buildState("client", "single"))).toBe(false);
	});
});

describe("selectIsHostGame", () => {
	it("is true only for a multiplayer game with the host role", () => {
		expect(selectIsHostGame(buildState("host", "multiplayer"))).toBe(true);
	});

	it("is false for client role or singleplayer mode", () => {
		expect(selectIsHostGame(buildState("client", "multiplayer"))).toBe(false);
		expect(selectIsHostGame(buildState("host", "single"))).toBe(false);
	});
});

describe("selectIsClientPlaying", () => {
	it("is true only when the client game status is 'playing'", () => {
		let state = buildState("client", "multiplayer");
		state = reducer(state, setGameStatus("playing"));
		expect(selectIsClientPlaying(state)).toBe(true);
	});

	it("is false when status is not 'playing', even for a client game", () => {
		let state = buildState("client", "multiplayer");
		state = reducer(state, setGameStatus("initial"));
		expect(selectIsClientPlaying(state)).toBe(false);
	});

	it("is false when playing but not a client game", () => {
		let state = buildState("host", "multiplayer");
		state = reducer(state, setGameStatus("playing"));
		expect(selectIsClientPlaying(state)).toBe(false);
	});
});
