import {
	setNetworkRole,
	stopTCPClient,
} from "@modules/core/network/shared/lib";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { stopTCPClientOnNetworkRoleChangeSaga } from "../stopTCPClientOnNetworkRoleChangeSaga";

describe("stopTCPClientOnNetworkRoleChangeSaga", () => {
	it("stops the TCP client when switching to host", () => {
		const tester = createSagaTester();
		tester.run(stopTCPClientOnNetworkRoleChangeSaga);

		tester.dispatch(setNetworkRole("host"));

		expect(tester.ofType(stopTCPClient.type)).toHaveLength(1);
	});

	it("stops the TCP client when the role is cleared entirely", () => {
		const tester = createSagaTester();
		tester.run(stopTCPClientOnNetworkRoleChangeSaga);

		tester.dispatch(setNetworkRole(null));

		expect(tester.ofType(stopTCPClient.type)).toHaveLength(1);
	});

	it("does not stop the TCP client when switching to client (it needs to run)", () => {
		const tester = createSagaTester();
		tester.run(stopTCPClientOnNetworkRoleChangeSaga);

		tester.dispatch(setNetworkRole("client"));

		expect(tester.ofType(stopTCPClient.type)).toHaveLength(0);
	});
});
