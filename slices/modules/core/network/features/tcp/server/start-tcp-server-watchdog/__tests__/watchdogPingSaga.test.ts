import {
	network,
	removeAllNetworkClients,
	setHostRunning,
	startTCPServer,
	stopTCPServer,
} from "@modules/core/network/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { watchdogPingSaga } from "../sagas/watchdogPingSaga";

const mockCheckTCPServerAlive = jest.fn();

jest.mock("../lib/checkTCPServerAlive", () => ({
	checkTCPServerAlive: () => mockCheckTCPServerAlive(),
}));

const reducer = combineReducers({ network: network.reducer });

beforeEach(() => {
	jest.useFakeTimers();
	mockCheckTCPServerAlive.mockReset();
});

afterEach(() => {
	jest.useRealTimers();
});

/**
 * M3 (audit/multiplayer.md): the audit found that a false-positive watchdog restart left ghost
 * clients in the store, because `removeAllNetworkClients()` was only called from
 * `restartTCPServerSaga.ts`, not from the watchdog's own restart path. Reading the current
 * `watchdogPingSaga.ts` shows `removeAllNetworkClients()` is now dispatched directly in that
 * saga's restart path (with a comment explaining why) — this test verifies the fix holds and
 * that dispatch order is stop -> clear clients -> start, so no stale sockets/roster survive.
 */
describe("watchdogPingSaga - M3 fix verification", () => {
	it("clears the network client roster when a ping failure triggers a restart", async () => {
		const tester = createSagaTester({ reducer });
		const task = tester.run(watchdogPingSaga);

		mockCheckTCPServerAlive.mockResolvedValue(false);
		tester.dispatch(setHostRunning(true));

		await Promise.resolve();
		await Promise.resolve();
		await Promise.resolve();

		const relevantActions = tester.actions
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

		expect(relevantActions).toEqual([
			stopTCPServer.type,
			removeAllNetworkClients.type,
			startTCPServer.type,
		]);

		task.cancel();
	});

	it("does nothing when the server is alive", async () => {
		const tester = createSagaTester({ reducer });
		const task = tester.run(watchdogPingSaga);

		mockCheckTCPServerAlive.mockResolvedValue(true);
		tester.dispatch(setHostRunning(true));
		await Promise.resolve();
		await Promise.resolve();

		expect(tester.actions.map((a) => a.type)).not.toContain(stopTCPServer.type);

		task.cancel();
	});

	it("stops polling once hostRunning becomes false", async () => {
		const tester = createSagaTester({ reducer });
		const task = tester.run(watchdogPingSaga);

		mockCheckTCPServerAlive.mockResolvedValue(true);
		tester.dispatch(setHostRunning(true));
		await Promise.resolve();
		await Promise.resolve();

		tester.dispatch(setHostRunning(false));
		mockCheckTCPServerAlive.mockClear();

		await jest.advanceTimersByTimeAsync(60_000);

		expect(mockCheckTCPServerAlive).not.toHaveBeenCalled();

		task.cancel();
	});
});
