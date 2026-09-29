import {
	network,
	setHostIP,
	setNetworkRole,
} from "@modules/core/network/shared/lib";
import { router, setCurrentRoute } from "@modules/core/router/shared/lib";
import { game, setGameStatus } from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import { stateAfter } from "@shared/lib/test/stateAfter";
import { selectClientReconnectAllowed } from "../selectClientReconnectAllowed";

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
	router: router.reducer,
});

type Setup = {
	role?: "host" | "client" | null;
	hostIP?: string | null;
	gameStatus?: "initial" | "started" | string;
	route?: string;
};

const buildState = ({
	role = "client",
	hostIP = "192.168.1.10",
	gameStatus = "started",
	route = routes.board,
}: Setup = {}) => {
	const state = stateAfter(
		reducer,
		setNetworkRole(role),
		setHostIP(hostIP),
		setGameStatus(gameStatus as never),
		setCurrentRoute(route as never),
	);
	return state;
};

describe("selectClientReconnectAllowed", () => {
	it("denies when role is not client", () => {
		expect(selectClientReconnectAllowed(buildState({ role: "host" }))).toBe(
			false,
		);
	});

	it("denies when role is null", () => {
		expect(selectClientReconnectAllowed(buildState({ role: null }))).toBe(
			false,
		);
	});

	it("denies when hostIP is not set", () => {
		expect(selectClientReconnectAllowed(buildState({ hostIP: null }))).toBe(
			false,
		);
	});

	it("denies on the home route regardless of everything else", () => {
		expect(
			selectClientReconnectAllowed(buildState({ route: routes.home })),
		).toBe(false);
	});

	it("allows a normal in-game drop (client, hostIP set, not home, not initial)", () => {
		expect(
			selectClientReconnectAllowed(
				buildState({ gameStatus: "started", route: routes.board }),
			),
		).toBe(true);
	});

	/**
	 * The lobby carve-out documented in the selector's own comment: gameStatus stays "initial"
	 * while waiting on the multiplayer screen, and a socket lost there must still be recoverable.
	 */
	it("allows reconnect while status is initial but the route is the lobby screen", () => {
		expect(
			selectClientReconnectAllowed(
				buildState({
					gameStatus: "initial",
					route: routes.startMultiplayer,
				}),
			),
		).toBe(true);
	});

	it("denies when status is initial on any other route (e.g. still on home-adjacent screens)", () => {
		expect(
			selectClientReconnectAllowed(
				buildState({ gameStatus: "initial", route: routes.settings }),
			),
		).toBe(false);
	});
});
