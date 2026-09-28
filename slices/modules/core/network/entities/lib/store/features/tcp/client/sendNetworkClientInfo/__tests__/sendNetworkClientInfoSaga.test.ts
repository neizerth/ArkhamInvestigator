import {
	connectNetworkClient,
	network,
	setHostIP,
	setNickname,
} from "@modules/core/network/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { sendNetworkClientInfo } from "../sendNetworkClientInfo";
import { sendNetworkClientInfoSaga } from "../sendNetworkClientInfoSaga";

const reducer = combineReducers({ network: network.reducer });

describe("sendNetworkClientInfoSaga", () => {
	it("sends the client's nickname and hostIP to connect", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNickname("Roland"));
		state = reducer(state, setHostIP("192.168.1.10"));
		const tester = createSagaTester({ reducer, state });
		tester.run(sendNetworkClientInfoSaga);

		tester.dispatch(sendNetworkClientInfo());

		const sends = tester.ofType(connectNetworkClient.type) as unknown as Array<{
			payload: { nickname: string; hostIP: string };
		}>;
		expect(sends).toHaveLength(1);
		expect(sends[0].payload).toEqual({
			nickname: "Roland",
			hostIP: "192.168.1.10",
		});
	});

	it("does nothing when hostIP is unset", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setNickname("Roland"));
		const tester = createSagaTester({ reducer, state });
		tester.run(sendNetworkClientInfoSaga);

		tester.dispatch(sendNetworkClientInfo());

		expect(tester.ofType(connectNetworkClient.type)).toHaveLength(0);
	});
});
