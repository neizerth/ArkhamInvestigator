import { appStarted } from "@modules/core/app/shared/lib";
import {
	network,
	setClientRunning,
	setHostRunning,
} from "@modules/core/network/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { resetTcpRuntimeFlagsOnAppStartedSaga } from "../resetTcpRuntimeFlagsOnAppStartedSaga";

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);

const mockGetTCPServerInstance = jest.fn();
const mockGetTCPClientSockets = jest.fn();
jest.mock("@modules/core/network/shared/lib", () => {
	const actual = jest.requireActual("@modules/core/network/shared/lib");
	return {
		...actual,
		getTCPServerInstance: () => mockGetTCPServerInstance(),
		getTCPClientSockets: () => mockGetTCPClientSockets(),
	};
});

const reducer = combineReducers({ network: network.reducer });

beforeEach(() => {
	mockGetTCPServerInstance.mockReset().mockReturnValue(null);
	mockGetTCPClientSockets.mockReset().mockReturnValue([]);
});

describe("resetTcpRuntimeFlagsOnAppStartedSaga", () => {
	it("clears hostRunning/clientRunning when there is no matching native socket", () => {
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setHostRunning(true));
		state = reducer(state, setClientRunning(true));
		const tester = createSagaTester({ reducer, state });
		tester.run(resetTcpRuntimeFlagsOnAppStartedSaga);

		tester.dispatch(appStarted());

		expect(tester.ofType(setHostRunning.type)).toHaveLength(1);
		expect(
			(
				tester.ofType(setHostRunning.type)[0] as ReturnType<
					typeof setHostRunning
				>
			).payload,
		).toBe(false);
		expect(tester.ofType(setClientRunning.type)).toHaveLength(1);
	});

	it("leaves hostRunning alone when a real TCP server instance already exists", () => {
		mockGetTCPServerInstance.mockReturnValue({ listening: true });
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setHostRunning(true));
		const tester = createSagaTester({ reducer, state });
		tester.run(resetTcpRuntimeFlagsOnAppStartedSaga);

		tester.dispatch(appStarted());

		expect(tester.ofType(setHostRunning.type)).toHaveLength(0);
	});

	it("leaves clientRunning alone when there is a live client socket", () => {
		mockGetTCPClientSockets.mockReturnValue([{ destroyed: false }]);
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setClientRunning(true));
		const tester = createSagaTester({ reducer, state });
		tester.run(resetTcpRuntimeFlagsOnAppStartedSaga);

		tester.dispatch(appStarted());

		expect(tester.ofType(setClientRunning.type)).toHaveLength(0);
	});

	it("only fires once even if appStarted is dispatched again", () => {
		const tester = createSagaTester({ reducer });
		tester.run(resetTcpRuntimeFlagsOnAppStartedSaga);

		tester.dispatch(appStarted());
		tester.dispatch(appStarted());

		expect(tester.ofType(setHostRunning.type)).toHaveLength(1);
	});
});
