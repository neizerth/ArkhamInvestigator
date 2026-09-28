import { sendNetworkClientInfo } from "@modules/core/network/entities/lib/store/features/tcp/client/sendNetworkClientInfo";
import { tcpClientSocketConnected } from "@modules/core/network/shared/lib";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { addTCPClientToHostSaga } from "../addTCPClientToHostSaga";

describe("addTCPClientToHostSaga", () => {
	it("sends the client's info to the host once the TCP socket connects", () => {
		const tester = createSagaTester();
		tester.run(addTCPClientToHostSaga);

		tester.dispatch(tcpClientSocketConnected());

		expect(tester.ofType(sendNetworkClientInfo.type)).toHaveLength(1);
	});
});
