import { appStateChanged } from "@modules/core/app/shared/lib";
import { checkTCPClientConnection } from "@modules/core/network/entities/lib/store/features/tcp/client/checkTCPClientConnection";
import {
	network,
	setHostRunning,
	setNetworkRole,
	startTCPServer,
} from "@modules/core/network/shared/lib";
import { game, setGameMode, setGameStatus } from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { stateAfter } from "@shared/lib/test/stateAfter";
import { sendNetworkClientKeepAliveSaga } from "../sendNetworkClientKeepAliveSaga";

jest.mock("@shared/lib", () => ({
	...require("@shared/lib/test/mocks").sharedLibMock(),
	seconds: (n: number) => n * 1000,
}));

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
});

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.useRealTimers();
});

/**
 * FIXED bug (found + fixed 2026-09-28, no prior report): `sendNetworkClientKeepAliveSaga`'s body
 * used to be 4 sequential top-level `yield`s with no `fork`/`all`:
 *   yield callEvery(10s, worker);
 *   yield callEvery(1s, deadServerWorker);
 *   yield takeEvery(appStateActive, worker);
 *   yield takeEvery(appStateActive, deadServerWorker);
 * `callEvery` (slices/shared/lib/util/store/callEvery.ts) is a hand-written `while (true) { call;
 * delay }` generator, not a self-forking helper the way `takeEvery` is — yielding it directly
 * blocked the parent generator on its infinite loop forever. Confirmed empirically (see the two
 * failing-before-the-fix assertions below) that only the very first `callEvery` (the 10s `worker`
 * ping) ever ran: `deadServerWorker`'s 1s dead-host-restart poll and BOTH `appStateChanged`
 * watchers never started at all — host self-healing after a dead TCP server, and the
 * foreground-triggered pings, silently never fired. Fixed by `fork`ing both `callEvery` calls so
 * all four run concurrently, which is what the sequential-yield code was actually trying to express.
 */
describe("sendNetworkClientKeepAliveSaga", () => {
	it("pings checkTCPClientConnection every 10s (the first callEvery)", async () => {
		const tester = createSagaTester({ reducer });
		const task = tester.run(sendNetworkClientKeepAliveSaga);

		await jest.advanceTimersByTimeAsync(10_000);
		expect(
			tester.ofType(checkTCPClientConnection.type).length,
		).toBeGreaterThanOrEqual(1);

		task.cancel();
	});

	it("also runs deadServerWorker's 1s poll, restarting a dead host server (regression for the fork bug)", async () => {
		const state = stateAfter(
			reducer,
			setNetworkRole("host"),
			setHostRunning(false),
			setGameMode("multiplayer" as never),
			setGameStatus("playing"),
		);
		const tester = createSagaTester({ reducer, state });
		const task = tester.run(sendNetworkClientKeepAliveSaga);

		await jest.advanceTimersByTimeAsync(1_000);

		expect(tester.ofType(startTCPServer.type).length).toBeGreaterThanOrEqual(1);

		task.cancel();
	});

	it("also responds to appStateChanged('active') by pinging the connection (regression for the fork bug)", async () => {
		const tester = createSagaTester({ reducer });
		const task = tester.run(sendNetworkClientKeepAliveSaga);

		const before = tester.ofType(checkTCPClientConnection.type).length;
		tester.dispatch(appStateChanged("active"));
		await Promise.resolve();

		expect(tester.ofType(checkTCPClientConnection.type).length).toBeGreaterThan(
			before,
		);

		task.cancel();
	});

	it("restarting a dead host server on the deadServerWorker's poll does not stop the 10s connection ping", async () => {
		const state = stateAfter(
			reducer,
			setNetworkRole("host"),
			setHostRunning(false),
			setGameMode("multiplayer" as never),
			setGameStatus("playing"),
		);
		const tester = createSagaTester({ reducer, state });
		const task = tester.run(sendNetworkClientKeepAliveSaga);

		await jest.advanceTimersByTimeAsync(10_000);

		expect(tester.ofType(startTCPServer.type).length).toBeGreaterThanOrEqual(1);
		expect(
			tester.ofType(checkTCPClientConnection.type).length,
		).toBeGreaterThanOrEqual(1);

		task.cancel();
	});
});
