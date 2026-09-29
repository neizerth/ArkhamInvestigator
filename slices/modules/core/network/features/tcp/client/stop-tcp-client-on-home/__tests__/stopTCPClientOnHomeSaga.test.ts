import { stopTCPClient } from "@modules/core/network/shared/lib";
import { router, setCurrentRoute } from "@modules/core/router/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { stopTCPClientOnHomeSaga } from "../stopTCPClientOnHomeSaga";

const reducer = combineReducers({ router: router.reducer });

describe("stopTCPClientOnHomeSaga", () => {
	it("stops the TCP client on navigating to home", () => {
		const tester = createSagaTester({ reducer });
		tester.run(stopTCPClientOnHomeSaga);

		tester.dispatch(setCurrentRoute(routes.home));

		expect(tester.ofType(stopTCPClient.type)).toHaveLength(1);
	});

	it("does nothing for any other route", () => {
		const tester = createSagaTester({ reducer });
		tester.run(stopTCPClientOnHomeSaga);

		tester.dispatch(setCurrentRoute(routes.board));

		expect(tester.ofType(stopTCPClient.type)).toHaveLength(0);
	});
});
