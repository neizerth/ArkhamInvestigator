import type { NetworkOutcomeAction } from "@modules/core/network/shared/model";
import { startMultiplayerGame } from "@modules/multiplayer/entities/lib/store/features/startMultiplayerGame";
import type TcpSocket from "react-native-tcp-socket";

const remoteAction = (type: string): NetworkOutcomeAction<unknown> => ({
	type,
	payload: {},
	meta: { notify: "all", remote: true },
});
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { connectTCPClientSaga } from "../server/connect-tcp-client/connectTCPClientSaga";
import { disconnectTCPClientSaga } from "../server/disconnect-tcp-client/disconnectTCPClientSaga";

/**
 * Host-side communication tests with 2, 3 and 4 simulated "devices" (fake sockets registered in
 * the real `tcpSocketMap` singleton, driven through the real host sagas and reducers) — this is
 * the multi-device coverage that a physical two/three/four-device Maestro e2e run would otherwise
 * exercise, but doable without any emulator/simulator since the TCP fan-out logic itself has no
 * platform dependency. See [[multiplayer-e2e-handoff]] for why the real e2e path is still blocked
 * on both Android and iOS.
 */

import { sendTCPAction } from "@modules/core/network/entities/lib/store/features/tcp/sendTCPAction/sendTCPAction";
import { sendTCPActionToClient } from "@modules/core/network/entities/lib/store/features/tcp/server/sendTCPActionToClient";
import { sendTCPActionToClientSaga } from "@modules/core/network/entities/lib/store/features/tcp/server/sendTCPActionToClient/sendTCPActionToClientSaga";
import {
	connectNetworkClient,
	network,
	networkClient,
	selectAllNetworkClients,
	tcpServerSocketClosed,
} from "@modules/core/network/shared/lib";
// The real singleton socket registry the server sagas read/write — imported directly so tests
// can register/clear fake sockets exactly like real connect/disconnect handling would.
import {
	clearTCPClientSockets,
	getTCPClientSocket,
	tcpSocketMap,
} from "@modules/core/network/shared/lib/logic/tcp/socket/server";
import { game, setGameStatus } from "@modules/game/shared/lib";

const reducer = combineReducers({
	network: network.reducer,
	networkClient: networkClient.reducer,
	game: game.reducer,
});

const makeFakeSocket = () =>
	({ destroyed: false, destroy: jest.fn() }) as unknown as TcpSocket.Socket;

const buildIncomeConnect = (
	networkId: string,
	nickname: string,
	socket: ReturnType<typeof makeFakeSocket>,
) => ({
	...connectNetworkClient({ nickname, hostIP: null }),
	meta: {
		source: "tcp" as const,
		networkId,
		socket,
		fromRemote: true,
		notify: "self" as const,
		receivedAt: new Date().toISOString(),
	},
});

beforeEach(() => {
	jest.useFakeTimers();
	clearTCPClientSockets();
});

afterEach(() => {
	jest.useRealTimers();
	// clearTCPClientSockets() calls socket.destroy() on every registered entry — our fakes have
	// none, so clear the map directly to leave no state for the next test.
	tcpSocketMap.clear();
});

/** Connects N devices to the host, one at a time, driven through the real connectTCPClientSaga. */
function connectDevices(
	tester: ReturnType<typeof createSagaTester>,
	count: number,
) {
	const sockets: {
		networkId: string;
		socket: ReturnType<typeof makeFakeSocket>;
	}[] = [];
	for (let i = 0; i < count; i++) {
		const networkId = `client-${i + 1}`;
		const socket = makeFakeSocket();
		tester.dispatch(buildIncomeConnect(networkId, `Player ${i + 1}`, socket));
		sockets.push({ networkId, socket });
	}
	return sockets;
}

describe.each([2, 3, 4])("host with %i connected devices", (deviceCount) => {
	it(`shows exactly ${deviceCount} distinct players in the lobby roster (no merges, no duplicates)`, () => {
		const tester = createSagaTester({ reducer });
		tester.run(connectTCPClientSaga);
		tester.dispatch(setGameStatus("started" as never));

		connectDevices(tester, deviceCount);

		const roster = selectAllNetworkClients(
			tester.getState() as Parameters<typeof selectAllNetworkClients>[0],
		);
		expect(roster).toHaveLength(deviceCount);
		expect(new Set(roster.map((c) => c.id)).size).toBe(deviceCount);
	});

	it(`broadcasts a business action to all ${deviceCount} devices except the sender`, async () => {
		const tester = createSagaTester({ reducer });
		tester.run(connectTCPClientSaga);
		tester.run(sendTCPActionToClientSaga);
		tester.dispatch(setGameStatus("started" as never));

		const devices = connectDevices(tester, deviceCount);
		const [sender, ...others] = devices;

		// ACK every send immediately so nothing waits on a retry for this test.
		tester.respond((action) => {
			if (!sendTCPAction.match(action)) return undefined;
			const { messageId, action: innerAction } = action.payload;
			return {
				type: "network/tcpActionReceived",
				payload: { messageId, type: innerAction.type },
				meta: { source: "tcp", networkId: "n/a", remote: true },
			};
		});

		tester.dispatch(
			sendTCPActionToClient({
				action: startMultiplayerGame(),
				type: "all",
				except: [sender.networkId],
			}),
		);

		await jest.advanceTimersByTimeAsync(0);
		await Promise.resolve();

		const sentSockets = new Set(
			tester
				.ofType(sendTCPAction.type)
				.filter(sendTCPAction.match)
				.map((a) => a.payload.socket),
		);

		// Every non-sender device received exactly one send; the sender received none.
		for (const other of others) {
			expect(sentSockets.has(other.socket)).toBe(true);
		}
		expect(sentSockets.has(sender.socket)).toBe(false);
		expect(sentSockets.size).toBe(deviceCount - 1);
	});

	it(`drops exactly one device and leaves the other ${deviceCount - 1} reachable`, async () => {
		const tester = createSagaTester({ reducer });
		tester.run(connectTCPClientSaga);
		tester.run(disconnectTCPClientSaga);
		tester.run(sendTCPActionToClientSaga);
		tester.dispatch(setGameStatus("started" as never));

		const devices = connectDevices(tester, deviceCount);
		const [dropped, ...remaining] = devices;

		expect(
			selectAllNetworkClients(
				tester.getState() as Parameters<typeof selectAllNetworkClients>[0],
			),
		).toHaveLength(deviceCount);

		// Simulate the dropped device's TCP connection closing on the host side.
		tester.dispatch(tcpServerSocketClosed({ socket: dropped.socket as never }));

		const roster = selectAllNetworkClients(
			tester.getState() as Parameters<typeof selectAllNetworkClients>[0],
		);
		expect(roster).toHaveLength(deviceCount - 1);
		expect(roster.map((c) => c.id)).not.toContain(dropped.networkId);
		expect(getTCPClientSocket(dropped.networkId)).toBeUndefined();

		// A broadcast after the drop reaches exactly the remaining devices, never the dropped one.
		tester.respond((action) => {
			if (!sendTCPAction.match(action)) return undefined;
			const { messageId, action: innerAction } = action.payload;
			return {
				type: "network/tcpActionReceived",
				payload: { messageId, type: innerAction.type },
				meta: { source: "tcp", networkId: "n/a", remote: true },
			};
		});

		tester.dispatch(
			sendTCPActionToClient({
				action: startMultiplayerGame(),
				type: "all",
			}),
		);
		await jest.advanceTimersByTimeAsync(0);
		await Promise.resolve();

		const sentSockets = new Set(
			tester
				.ofType(sendTCPAction.type)
				.filter(sendTCPAction.match)
				.map((a) => a.payload.socket),
		);
		expect(sentSockets.has(dropped.socket)).toBe(false);
		expect(sentSockets.size).toBe(remaining.length);
	});
});

/**
 * Ordering guarantee (C3 fix) holds under fan-out, not just single-socket: two business actions
 * broadcast to 3 devices back-to-back must not let the second overtake the first on any socket,
 * even when one device's delivery stalls into a retry.
 */
describe("broadcast ordering across multiple devices (C3 regression, N-device case)", () => {
	it("keeps per-socket wire order even when one of three devices is slow to ACK", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(connectTCPClientSaga);
		tester.run(sendTCPActionToClientSaga);
		tester.dispatch(setGameStatus("started" as never));

		const devices = connectDevices(tester, 3);
		const [slowDevice] = devices;

		const actionA = remoteAction("test/actionA");
		const actionB = remoteAction("test/actionB");

		tester.respond((action) => {
			if (!sendTCPAction.match(action)) return undefined;
			const { messageId, action: innerAction, socket } = action.payload;
			// Never ack actionA's first attempt on the slow device; ack everything else immediately.
			if (socket === slowDevice.socket && innerAction.type === actionA.type) {
				const priorSends = tester
					.ofType(sendTCPAction.type)
					.filter(sendTCPAction.match)
					.filter(
						(a) =>
							a.payload.socket === slowDevice.socket &&
							a.payload.action.type === actionA.type,
					);
				if (priorSends.length <= 1) return undefined;
			}
			return {
				type: "network/tcpActionReceived",
				payload: { messageId, type: innerAction.type },
				meta: { source: "tcp", networkId: "n/a", remote: true },
			};
		});

		tester.dispatch(sendTCPActionToClient({ action: actionA, type: "all" }));
		tester.dispatch(sendTCPActionToClient({ action: actionB, type: "all" }));

		await jest.advanceTimersByTimeAsync(10_000);
		await Promise.resolve();
		await Promise.resolve();

		const sendsToSlowDevice = tester
			.ofType(sendTCPAction.type)
			.filter(sendTCPAction.match)
			.filter((a) => a.payload.socket === slowDevice.socket)
			.map((a) => a.payload.action.type);

		// actionA (with its retry) fully completes on the slow device before actionB is sent to it,
		// even though actionB reached the other two devices immediately.
		expect(sendsToSlowDevice).toEqual([
			actionA.type,
			actionA.type,
			actionB.type,
		]);
	});
});
