import { sendRemoteAction } from "@modules/core/network/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { syncRemoteNotificationsSaga } from "../syncRemoteNotificationsSaga";

describe("syncRemoteNotificationsSaga", () => {
	it("rebroadcasts a local notification marked remote:true", () => {
		const tester = createSagaTester();
		tester.run(syncRemoteNotificationsSaga);

		tester.dispatch(
			sendNotification({ message: "hello", type: "info", remote: true }),
		);

		expect(tester.ofType(sendRemoteAction.type)).toHaveLength(1);
	});

	it("does not rebroadcast a notification without remote:true", () => {
		const tester = createSagaTester();
		tester.run(syncRemoteNotificationsSaga);

		tester.dispatch(sendNotification({ message: "hello", type: "info" }));

		expect(tester.ofType(sendRemoteAction.type)).toHaveLength(0);
	});

	it("does not re-broadcast a notification that itself arrived from the network (avoids a loop)", () => {
		const tester = createSagaTester();
		tester.run(syncRemoteNotificationsSaga);

		const incomeAction = {
			...sendNotification({ message: "hello", type: "info", remote: true }),
			meta: { source: "tcp" as const, networkId: "client-1" },
		};
		tester.dispatch(incomeAction);

		expect(tester.ofType(sendRemoteAction.type)).toHaveLength(0);
	});
});
