import {
	network,
	setNetworkRole,
	stopTCPServer,
} from "@modules/core/network/shared/lib";
import { router, setCurrentRoute } from "@modules/core/router/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { stopTCPServerOnHomeSaga } from "../stopTCPServerOnHomeSaga";

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);

const reducer = combineReducers({
	network: network.reducer,
	router: router.reducer,
});

describe("stopTCPServerOnHomeSaga", () => {
	it("stops the TCP server on navigating to home when it's the host", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("host"));
		const tester = createSagaTester({ reducer, state });
		tester.run(stopTCPServerOnHomeSaga);

		tester.dispatch(setCurrentRoute(routes.home));

		expect(tester.ofType(stopTCPServer.type)).toHaveLength(1);
	});

	it("does nothing on home for a client role", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("client"));
		const tester = createSagaTester({ reducer, state });
		tester.run(stopTCPServerOnHomeSaga);

		tester.dispatch(setCurrentRoute(routes.home));

		expect(tester.ofType(stopTCPServer.type)).toHaveLength(0);
	});

	it("does nothing for any other route even as host", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNetworkRole("host"));
		const tester = createSagaTester({ reducer, state });
		tester.run(stopTCPServerOnHomeSaga);

		tester.dispatch(setCurrentRoute(routes.board));

		expect(tester.ofType(stopTCPServer.type)).toHaveLength(0);
	});
});
