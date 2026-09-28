import { nicknameChanged } from "@modules/core/network/entities/lib/store/features/changeNickname";
import { restartTCPServer } from "@modules/core/network/shared/lib";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { restartTCPServerOnNicknameChangeSaga } from "../restartTCPServerOnNicknameChangeSaga";

describe("restartTCPServerOnNicknameChangeSaga", () => {
	it("restarts the TCP server whenever the nickname changes", () => {
		const tester = createSagaTester();
		tester.run(restartTCPServerOnNicknameChangeSaga);

		tester.dispatch(nicknameChanged({ oldValue: "A", value: "B" }));

		expect(tester.ofType(restartTCPServer.type)).toHaveLength(1);
	});

	it("restarts again for each subsequent nickname change", () => {
		const tester = createSagaTester();
		tester.run(restartTCPServerOnNicknameChangeSaga);

		tester.dispatch(nicknameChanged({ oldValue: "A", value: "B" }));
		tester.dispatch(nicknameChanged({ oldValue: "B", value: "C" }));

		expect(tester.ofType(restartTCPServer.type)).toHaveLength(2);
	});
});
