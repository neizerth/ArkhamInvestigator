import {
	connectNetworkClient,
	network,
	networkClient,
	selectIP,
	setIP,
} from "@modules/core/network/shared/lib";
import { game } from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { connectTCPClientSaga } from "../connectTCPClientSaga";

jest.mock("@modules/core/network/shared/lib", () => {
	const actual = jest.requireActual("@modules/core/network/shared/lib");
	return {
		...actual,
		setTCPClientSocket: jest.fn(),
	};
});

const reducer = combineReducers({
	network: network.reducer,
	networkClient: networkClient.reducer,
	game: game.reducer,
});

const fakeSocket = {} as never;

const buildIncomeAction = (hostIP: string) => ({
	...connectNetworkClient({ nickname: "player", hostIP }),
	meta: {
		source: "tcp" as const,
		networkId: "client-9",
		socket: fakeSocket,
		fromRemote: true,
		notify: "self" as const,
		receivedAt: new Date().toISOString(),
	},
});

/**
 * S5 (audit/multiplayer.md), FIXED 2026-09-27: the host used to adopt whatever `hostIP` a
 * connecting client reported, verbatim, whenever its own `selectIP` was unset. It now only falls
 * back to that value when it looks like a plausible private LAN address (`isPrivateIPv4`) — a
 * malformed or public/non-LAN value is rejected instead of being adopted as the host's own IP.
 */
describe("connectTCPClientSaga - S5 (fixed: validates client-supplied hostIP)", () => {
	it("adopts a private-LAN hostIP from the client when the host's own IP is unset", () => {
		const tester = createSagaTester({ reducer });
		tester.run(connectTCPClientSaga);

		expect(selectIP(tester.getState())).toBeNull();

		tester.dispatch(buildIncomeAction("192.168.1.66"));

		const setIpActions = tester.ofType(setIP.type);
		expect(setIpActions).toHaveLength(1);
		expect((setIpActions[0] as ReturnType<typeof setIP>).payload).toBe(
			"192.168.1.66",
		);
		expect(selectIP(tester.getState())).toBe("192.168.1.66");
	});

	it("rejects a public/non-LAN hostIP claimed by the client (regression test for audit/multiplayer.md S5)", () => {
		const tester = createSagaTester({ reducer });
		tester.run(connectTCPClientSaga);

		tester.dispatch(buildIncomeAction("203.0.113.66"));

		expect(tester.ofType(setIP.type)).toHaveLength(0);
		expect(selectIP(tester.getState())).toBeNull();
	});

	it("rejects a malformed hostIP claimed by the client", () => {
		const tester = createSagaTester({ reducer });
		tester.run(connectTCPClientSaga);

		tester.dispatch(buildIncomeAction("NaN.NaN.NaN.NaN"));

		expect(tester.ofType(setIP.type)).toHaveLength(0);
		expect(selectIP(tester.getState())).toBeNull();
	});

	it("does not overwrite an already-known host IP with the client's claim", () => {
		const preloaded = reducer(undefined, { type: "@@init" });
		const state = {
			...preloaded,
			network: { ...preloaded.network, ip: "192.168.1.50" },
		};
		const tester = createSagaTester({ reducer, state });
		tester.run(connectTCPClientSaga);

		tester.dispatch(buildIncomeAction("10.0.0.99"));

		expect(tester.ofType(setIP.type)).toHaveLength(0);
		expect(selectIP(tester.getState())).toBe("192.168.1.50");
	});
});
