import {
	network,
	removeAllNetworkClients,
	restartTCPServer,
	setNetworkRole,
	startTCPServer,
	stopTCPServer,
	tcpServerClosed,
} from "@modules/core/network/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { restartTCPServerSaga } from "../restartTCPServerSaga";

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);
jest.mock("@modules/core/log/shared/config", () => ({
	tcpLog: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

const reducer = combineReducers({ network: network.reducer });

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.useRealTimers();
});

describe("restartTCPServerSaga", () => {
	it("no-ops for a client role", async () => {
		const state = reducer(
			reducer(undefined, { type: "@@init" }),
			setNetworkRole("client"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(restartTCPServerSaga);

		tester.dispatch(restartTCPServer());
		await jest.advanceTimersByTimeAsync(0);

		expect(tester.ofType(stopTCPServer.type)).toHaveLength(0);
	});

	it("stops, clears all network clients, then starts again in that order once the port is released", async () => {
		const state = reducer(
			reducer(undefined, { type: "@@init" }),
			setNetworkRole("host"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(restartTCPServerSaga);

		tester.dispatch(restartTCPServer());
		await jest.advanceTimersByTimeAsync(0);

		expect(tester.ofType(stopTCPServer.type)).toHaveLength(1);

		tester.dispatch(tcpServerClosed());
		await jest.advanceTimersByTimeAsync(150);

		const relevantTypes = tester.actions
			.map((a) => a.type)
			.filter((type) =>
				(
					[
						stopTCPServer.type,
						removeAllNetworkClients.type,
						startTCPServer.type,
					] as string[]
				).includes(type),
			);

		expect(relevantTypes).toEqual([
			stopTCPServer.type,
			removeAllNetworkClients.type,
			startTCPServer.type,
		]);
	});

	it("skips the restart when the port stays held and tcpServerClosed never arrives (5s timeout)", async () => {
		const state = reducer(
			reducer(undefined, { type: "@@init" }),
			setNetworkRole("host"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(restartTCPServerSaga);

		tester.dispatch(restartTCPServer());
		await jest.advanceTimersByTimeAsync(0);
		expect(tester.ofType(stopTCPServer.type)).toHaveLength(1);

		await jest.advanceTimersByTimeAsync(5_000);

		expect(tester.ofType(removeAllNetworkClients.type)).toHaveLength(0);
		expect(tester.ofType(startTCPServer.type)).toHaveLength(0);
	});
});
