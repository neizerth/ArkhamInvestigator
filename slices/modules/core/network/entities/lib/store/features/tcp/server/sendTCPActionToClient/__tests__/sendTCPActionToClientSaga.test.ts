import { sendTCPAction } from "@modules/core/network/entities/lib/store/features/tcp/sendTCPAction";
import type { NetworkOutcomeAction } from "@modules/core/network/shared/model";
import { createSagaTester } from "@shared/lib/test/createSagaTester";

const remoteAction = (type: string): NetworkOutcomeAction<unknown> => ({
	type,
	payload: {},
	meta: { notify: "all", remote: true },
});
import { sendTCPActionToClient } from "../sendTCPActionToClient";
import { sendTCPActionToClientSaga } from "../sendTCPActionToClientSaga";

// A single fake socket shared by both "clients" in this test: sendTCPActionToClient
// always targets it with type "single". Prefixed `mock` so jest.mock's factory may reference it.
const mockFakeSockets = new Map<string, { destroyed: boolean }>();

jest.mock("@modules/core/network/shared/lib", () => {
	const actual = jest.requireActual("@modules/core/network/shared/lib");
	return {
		...actual,
		getTCPClientSockets: () => Array.from(mockFakeSockets.values()),
		getTCPClientSocket: (id: string) => mockFakeSockets.get(id),
	};
});

const socket = { destroyed: false };

beforeEach(() => {
	jest.useFakeTimers();
	mockFakeSockets.clear();
	mockFakeSockets.set("client-1", socket);
});

afterEach(() => {
	jest.useRealTimers();
});

/**
 * C3 (audit/multiplayer.md), FIXED 2026-09-27: `processRequests` used to `fork` each action's
 * worker without waiting, so two actions read off the channel back-to-back ran as independent,
 * concurrently-retrying workers — a first action stuck in a retry could be overtaken on the wire
 * by a later one. Business actions are now `call`ed (awaited) one at a time, so a retry blocks the
 * queue instead of letting a later action jump ahead; ACKs still `fork` (fire-and-forget) so they
 * are never delayed behind an unrelated business action's retry loop.
 */
describe("sendTCPActionToClientSaga - C3 action order", () => {
	it("keeps a retried action's send ahead of a later one queued behind it (regression test for audit/multiplayer.md C3)", async () => {
		const tester = createSagaTester();
		const task = tester.run(sendTCPActionToClientSaga);

		const actionA = remoteAction("test/actionA");
		const actionB = remoteAction("test/actionB");

		// Respond to any wire send: ACK both, but only once actionA's retry has gone out —
		// simulates a slow/lossy link where the first attempt's ACK never arrives.
		tester.respond((action) => {
			if (!sendTCPAction.match(action)) {
				return undefined;
			}
			const { action: innerAction, messageId } = action.payload;
			const sends = tester
				.ofType(sendTCPAction.type)
				.filter(sendTCPAction.match)
				.filter((a) => a.payload.action.type === actionA.type);
			// Never ack actionA's first attempt, forcing its retry; ack everything else immediately.
			if (innerAction.type === actionA.type && sends.length <= 1) {
				return undefined;
			}
			return {
				type: "network/tcpActionReceived",
				payload: { messageId, type: innerAction.type },
				meta: { source: "tcp", networkId: "client-1", remote: true },
			};
		});

		tester.dispatch(
			sendTCPActionToClient({
				action: actionA,
				type: "single",
				networkId: "client-1",
			}),
		);
		tester.dispatch(
			sendTCPActionToClient({
				action: actionB,
				type: "single",
				networkId: "client-1",
			}),
		);

		const wireOrderTypes = () =>
			tester
				.ofType(sendTCPAction.type)
				.filter(sendTCPAction.match)
				.map((a) => a.payload.action.type);

		// actionA's first attempt goes out; actionB stays queued behind it on the channel.
		await Promise.resolve();
		await Promise.resolve();
		expect(wireOrderTypes()).toEqual([actionA.type]);

		// actionA times out (5s ACK wait) and retries (5s TCP_RETRY_DELAY) before actionB is
		// ever sent — the queue is genuinely serialized now, not just "usually fast enough".
		await jest.advanceTimersByTimeAsync(10_000);
		await Promise.resolve();
		await Promise.resolve();

		expect(wireOrderTypes()).toEqual([
			actionA.type,
			actionA.type,
			actionB.type,
		]);

		task.cancel();
	});

	it("still sends an ACK immediately even while a business action is mid-retry on the same channel", async () => {
		const tester = createSagaTester();
		const task = tester.run(sendTCPActionToClientSaga);

		const businessAction = remoteAction("test/actionA");

		// Never ack the business action, so it sits in its retry loop for the whole test.
		tester.respond((action) => {
			if (!sendTCPAction.match(action)) return undefined;
			return undefined;
		});

		tester.dispatch(
			sendTCPActionToClient({
				action: businessAction,
				type: "single",
				networkId: "client-1",
			}),
		);
		await Promise.resolve();
		await Promise.resolve();

		tester.dispatch(
			sendTCPActionToClient({
				action: remoteAction("network/tcpActionReceived"),
			}),
		);
		await Promise.resolve();
		await Promise.resolve();

		const wireOrderTypes = () =>
			tester
				.ofType(sendTCPAction.type)
				.filter(sendTCPAction.match)
				.map((a) => a.payload.action.type);

		// The ACK went out right away, not stuck behind the business action's still-open retry wait.
		expect(wireOrderTypes()).toEqual([
			businessAction.type,
			"network/tcpActionReceived",
		]);

		task.cancel();
	});
});
