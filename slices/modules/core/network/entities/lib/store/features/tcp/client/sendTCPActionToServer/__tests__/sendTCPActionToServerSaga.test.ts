import { sendTCPAction } from "@modules/core/network/entities/lib/store/features/tcp/sendTCPAction";
import type { NetworkOutcomeAction } from "@modules/core/network/shared/model";
import { createSagaTester } from "@shared/lib/test/createSagaTester";

const remoteAction = (type: string): NetworkOutcomeAction<unknown> => ({
	type,
	payload: {},
	meta: { notify: "all", remote: true },
});
import { sendTCPActionToServer } from "../sendTCPActionToServer";
import { sendTCPActionToServerSaga } from "../sendTCPActionToServerSaga";

const socket = { destroyed: false };

jest.mock("@modules/core/network/shared/lib", () => {
	const actual = jest.requireActual("@modules/core/network/shared/lib");
	return {
		...actual,
		getTCPServerSocket: () => socket,
	};
});

beforeEach(() => {
	jest.useFakeTimers();
	socket.destroyed = false;
});

afterEach(() => {
	jest.useRealTimers();
});

/**
 * C3 (audit/multiplayer.md) on the client-to-host direction — this saga is the client-side mirror
 * of sendTCPActionToClientSaga (fixed 2026-09-27) and had the identical `fork`-per-action bug,
 * missed until 2026-09-28: `processRequests` forked each action's worker without waiting, so two
 * actions dispatched back-to-back ran as independent, concurrently-retrying workers. Fixed the same
 * way: business actions now serialize on their own channel via `call`, ACKs fork on a separate
 * channel so they never wait behind a stuck business retry.
 */
describe("sendTCPActionToServerSaga - C3 action order (client-to-host direction)", () => {
	it("keeps a retried action's send ahead of a later one queued behind it", async () => {
		const tester = createSagaTester();
		const task = tester.run(sendTCPActionToServerSaga);

		const actionA = remoteAction("test/actionA");
		const actionB = remoteAction("test/actionB");

		tester.respond((action) => {
			if (!sendTCPAction.match(action)) return undefined;
			const { action: innerAction, messageId } = action.payload;
			const sends = tester
				.ofType(sendTCPAction.type)
				.filter(sendTCPAction.match)
				.filter((a) => a.payload.action.type === actionA.type);
			if (innerAction.type === actionA.type && sends.length <= 1) {
				return undefined; // never ack actionA's first attempt -> forces its retry
			}
			return {
				type: "network/tcpActionReceived",
				payload: { messageId, type: innerAction.type },
				meta: { source: "tcp", networkId: "n/a", remote: true },
			};
		});

		tester.dispatch(sendTCPActionToServer({ action: actionA }));
		tester.dispatch(sendTCPActionToServer({ action: actionB }));

		const wireOrderTypes = () =>
			tester
				.ofType(sendTCPAction.type)
				.filter(sendTCPAction.match)
				.map((a) => a.payload.action.type);

		await Promise.resolve();
		await Promise.resolve();
		expect(wireOrderTypes()).toEqual([actionA.type]);

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

	it("still sends an ACK immediately even while a business action is mid-retry", async () => {
		const tester = createSagaTester();
		const task = tester.run(sendTCPActionToServerSaga);

		const businessAction = remoteAction("test/actionA");

		tester.respond((action) => {
			if (!sendTCPAction.match(action)) return undefined;
			return undefined; // never ack -> business action stays mid-retry forever
		});

		tester.dispatch(sendTCPActionToServer({ action: businessAction }));
		await Promise.resolve();
		await Promise.resolve();

		tester.dispatch(
			sendTCPActionToServer({
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

		expect(wireOrderTypes()).toEqual([
			businessAction.type,
			"network/tcpActionReceived",
		]);

		task.cancel();
	});

	it("skips sending when the server socket is destroyed", async () => {
		socket.destroyed = true;
		const tester = createSagaTester();
		const task = tester.run(sendTCPActionToServerSaga);

		tester.dispatch(
			sendTCPActionToServer({ action: remoteAction("test/action") }),
		);
		await Promise.resolve();
		await Promise.resolve();

		expect(tester.ofType(sendTCPAction.type)).toHaveLength(0);

		task.cancel();
	});
});
