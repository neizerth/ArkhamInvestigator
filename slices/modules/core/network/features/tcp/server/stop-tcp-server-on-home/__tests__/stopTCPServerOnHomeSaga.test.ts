import {
	network,
	setNetworkRole,
	stopTCPServer,
} from "@modules/core/network/shared/lib";
import { router, setCurrentRoute } from "@modules/core/router/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { stateAfter } from "@shared/lib/test/stateAfter";
import { stopTCPServerOnHomeSaga } from "../stopTCPServerOnHomeSaga";

const reducer = combineReducers({
	network: network.reducer,
	router: router.reducer,
});

describe("stopTCPServerOnHomeSaga", () => {
	it("stops the TCP server on navigating to home when it's the host", () => {
		const state = stateAfter(reducer, setNetworkRole("host"));
		const tester = createSagaTester({ reducer, state });
		tester.run(stopTCPServerOnHomeSaga);

		tester.dispatch(setCurrentRoute(routes.home));

		expect(tester.ofType(stopTCPServer.type)).toHaveLength(1);
	});

	it("does nothing on home for a client role", () => {
		const state = stateAfter(reducer, setNetworkRole("client"));
		const tester = createSagaTester({ reducer, state });
		tester.run(stopTCPServerOnHomeSaga);

		tester.dispatch(setCurrentRoute(routes.home));

		expect(tester.ofType(stopTCPServer.type)).toHaveLength(0);
	});

	it("does nothing for any other route even as host", () => {
		const state = stateAfter(reducer, setNetworkRole("host"));
		const tester = createSagaTester({ reducer, state });
		tester.run(stopTCPServerOnHomeSaga);

		tester.dispatch(setCurrentRoute(routes.board));

		expect(tester.ofType(stopTCPServer.type)).toHaveLength(0);
	});
});
