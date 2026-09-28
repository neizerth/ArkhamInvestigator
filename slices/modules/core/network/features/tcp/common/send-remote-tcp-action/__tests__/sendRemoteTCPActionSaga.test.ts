import { sendTCPActionToServer } from "@modules/core/network/entities/lib/store/features/tcp/client/sendTCPActionToServer";
import { sendTCPActionToClient } from "@modules/core/network/entities/lib/store/features/tcp/server/sendTCPActionToClient";
import {
	network,
	selectHostIP,
	sendRemoteAction,
	setHostIP,
	setNetworkRole,
} from "@modules/core/network/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { sendRemoteTCPActionSaga } from "../sendRemoteTCPActionSaga";

const reducer = combineReducers({ network: network.reducer });

const buildRemoteAction = (
	meta: Record<string, unknown> = {},
	socket?: unknown,
) => ({
	type: "test/action",
	payload: {},
	meta: { remote: true, notify: "all", ...meta, ...(socket ? { socket } : {}) },
});

describe("sendRemoteTCPActionSaga", () => {
	it("ignores an action without meta.remote", () => {
		const tester = createSagaTester({ reducer });
		tester.run(sendRemoteTCPActionSaga);

		tester.dispatch({ type: "test/action", payload: {} } as never);

		expect(tester.ofType(sendTCPActionToServer.type)).toHaveLength(0);
		expect(tester.ofType(sendTCPActionToClient.type)).toHaveLength(0);
	});

	it("skips a notify:'self' action entirely", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setHostIP("192.168.1.10"));
		const tester = createSagaTester({ reducer, state });
		tester.run(sendRemoteTCPActionSaga);

		tester.dispatch(buildRemoteAction({ notify: "self" }));

		expect(tester.ofType(sendTCPActionToServer.type)).toHaveLength(0);
	});

	it("skips when there is no network role at all", () => {
		const tester = createSagaTester({ reducer });
		tester.run(sendRemoteTCPActionSaga);

		tester.dispatch(buildRemoteAction());

		expect(tester.ofType(sendTCPActionToServer.type)).toHaveLength(0);
		expect(tester.ofType(sendTCPActionToClient.type)).toHaveLength(0);
	});

	it("skips a notify:'host' action when we ARE the host (avoids self-notify)", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("host"));
		const tester = createSagaTester({ reducer, state });
		tester.run(sendRemoteTCPActionSaga);

		tester.dispatch(buildRemoteAction({ notify: "host" }));

		expect(tester.ofType(sendTCPActionToClient.type)).toHaveLength(0);
	});

	it("skips sending as a client with no hostIP", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		const tester = createSagaTester({ reducer, state });
		tester.run(sendRemoteTCPActionSaga);

		tester.dispatch(buildRemoteAction());

		expect(tester.ofType(sendTCPActionToServer.type)).toHaveLength(0);
	});

	it("routes to sendTCPActionToServer for a client with a hostIP, stripping the socket from meta", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		state = reducer(state, setHostIP("192.168.1.10"));
		const tester = createSagaTester({ reducer, state });
		tester.run(sendRemoteTCPActionSaga);

		tester.dispatch(buildRemoteAction({}, { id: "fake-socket" }));

		const sends = tester.ofType(
			sendTCPActionToServer.type,
		) as unknown as Array<{
			payload: { action: { meta: Record<string, unknown> } };
		}>;
		expect(sends).toHaveLength(1);
		expect(sends[0].payload.action.meta.socket).toBeUndefined();
		expect(selectHostIP(tester.getState())).toBe("192.168.1.10"); // unaffected side effect check
	});

	it("routes to sendTCPActionToClient as a single-target send when targetNetworkId is set (host replying to one client)", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("host"));
		const tester = createSagaTester({ reducer, state });
		tester.run(sendRemoteTCPActionSaga);

		tester.dispatch(buildRemoteAction({ targetNetworkId: "client-1" }));

		const sends = tester.ofType(
			sendTCPActionToClient.type,
		) as unknown as Array<{
			payload: { type: string; networkId?: string };
		}>;
		expect(sends).toHaveLength(1);
		expect(sends[0].payload.type).toBe("single");
		expect(sends[0].payload.networkId).toBe("client-1");
	});

	it("routes to sendTCPActionToClient as a broadcast when there is no targetNetworkId (host)", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("host"));
		const tester = createSagaTester({ reducer, state });
		tester.run(sendRemoteTCPActionSaga);

		tester.dispatch(buildRemoteAction());

		const sends = tester.ofType(
			sendTCPActionToClient.type,
		) as unknown as Array<{
			payload: { type?: string; networkId?: string };
		}>;
		expect(sends).toHaveLength(1);
		expect(sends[0].payload.networkId).toBeUndefined();
	});

	it("re-dispatches the wrapped action locally on sendRemoteAction", () => {
		const tester = createSagaTester({ reducer });
		tester.run(sendRemoteTCPActionSaga);

		tester.dispatch(
			sendRemoteAction({
				action: { type: "test/local", payload: {} } as never,
			}),
		);

		expect(tester.ofType("test/local")).toHaveLength(1);
	});
});
