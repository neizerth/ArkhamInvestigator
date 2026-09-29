import {
	network,
	selectNickname,
	setNickname,
} from "@modules/core/network/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { stateAfter } from "@shared/lib/test/stateAfter";
import { changeNickname, nicknameChanged } from "../changeNickname";
import { changeNicknameSaga } from "../changeNicknameSaga";

const reducer = combineReducers({ network: network.reducer });

describe("changeNicknameSaga", () => {
	it("sets the new nickname and announces the change when one was already set", () => {
		const state = stateAfter(reducer, setNickname("Roland"));
		const tester = createSagaTester({ reducer, state });
		tester.run(changeNicknameSaga);

		tester.dispatch(changeNickname("Zoey"));

		expect(selectNickname(tester.getState())).toBe("Zoey");
		const changes = tester.ofType(nicknameChanged.type) as unknown as Array<{
			payload: { oldValue: string; value: string };
		}>;
		expect(changes).toHaveLength(1);
		expect(changes[0].payload).toEqual({ oldValue: "Roland", value: "Zoey" });
	});

	it("does not announce a change on the very first nickname set (no prior value)", () => {
		const tester = createSagaTester({ reducer }); // default nickname is falsy
		tester.run(changeNicknameSaga);

		tester.dispatch(changeNickname("Roland"));

		expect(selectNickname(tester.getState())).toBe("Roland");
		expect(tester.ofType(nicknameChanged.type)).toHaveLength(0);
	});
});
