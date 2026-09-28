import {
	stopTCPServer,
	stopTCPServerZeroconf,
} from "@modules/core/network/shared/lib";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { stopTCPServerSaga } from "../stopTCPServerSaga";

describe("stopTCPServerSaga", () => {
	it("dispatches stopTCPServerZeroconf whenever stopTCPServer fires", async () => {
		const tester = createSagaTester();
		tester.run(stopTCPServerSaga);

		tester.dispatch(stopTCPServer());
		await Promise.resolve();

		expect(tester.ofType(stopTCPServerZeroconf.type)).toHaveLength(1);
	});

	it("handles multiple stop events, one dispatch each", async () => {
		const tester = createSagaTester();
		tester.run(stopTCPServerSaga);

		tester.dispatch(stopTCPServer());
		tester.dispatch(stopTCPServer());
		await Promise.resolve();

		expect(tester.ofType(stopTCPServerZeroconf.type)).toHaveLength(2);
	});
});
