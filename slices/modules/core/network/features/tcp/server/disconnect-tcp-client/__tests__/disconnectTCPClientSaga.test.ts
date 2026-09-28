import {
	networkClient,
	removeNetworkClient,
	setTCPClientSocket,
	tcpServerSocketClosed,
} from "@modules/core/network/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { disconnectTCPClientSaga } from "../disconnectTCPClientSaga";

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);

const reducer = combineReducers({ networkClient: networkClient.reducer });

const fakeSocket = { destroy: jest.fn() } as never;
const unregisteredSocket = { destroy: jest.fn() } as never;

describe("disconnectTCPClientSaga", () => {
	it("clears the socket map and removes the network client when a networkId is resolved", () => {
		setTCPClientSocket("client-1", fakeSocket);

		const preloaded = reducer(undefined, { type: "@@init" });
		const state = {
			networkClient: {
				...preloaded.networkClient,
				ids: ["client-1"],
				entities: {
					"client-1": { id: "client-1", nickname: "player" } as never,
				},
			},
		};
		const tester = createSagaTester({ reducer, state });
		tester.run(disconnectTCPClientSaga);

		tester.dispatch(tcpServerSocketClosed({ socket: fakeSocket }));

		const removeActions = tester.ofType(removeNetworkClient.type);
		expect(removeActions).toHaveLength(1);
		expect(
			(removeActions[0] as ReturnType<typeof removeNetworkClient>).payload,
		).toBe("client-1");
		expect(tester.getState().networkClient.ids).toEqual([]);
	});

	/**
	 * A socket that closes before completing the connect handshake never got a networkId
	 * assigned in `tcpSocketMap`. The saga must no-op rather than dispatch
	 * `removeNetworkClient(undefined)`, which would otherwise corrupt the entity adapter state.
	 */
	it("no-ops when the closed socket never resolved to a networkId (never completed handshake)", () => {
		const tester = createSagaTester({ reducer });
		tester.run(disconnectTCPClientSaga);

		tester.dispatch(tcpServerSocketClosed({ socket: unregisteredSocket }));

		expect(tester.ofType(removeNetworkClient.type)).toHaveLength(0);
	});
});
