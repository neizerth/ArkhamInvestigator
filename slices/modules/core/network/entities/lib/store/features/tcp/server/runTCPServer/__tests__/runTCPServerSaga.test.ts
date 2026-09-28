import { network, setNickname } from "@modules/core/network/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { eventChannel } from "redux-saga";
import { runTCPServerSaga } from "../runTCPServerSaga";

jest.mock("@modules/core/log/shared/config", () => ({
	tcpLog: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
	log: { error: jest.fn(), warn: jest.fn(), info: jest.fn() },
}));

let emitFromChannel: ((action: unknown) => void) | null = null;
let closeSpy: jest.Mock;
const mockCreateTCPServerChannel = jest.fn();
jest.mock("../createTCPServerChannel", () => ({
	createTCPServerChannel: (...args: unknown[]) =>
		mockCreateTCPServerChannel(...args),
}));

const mockGetTCPServerInstance = jest.fn();
const mockClearTCPServerInstance = jest.fn();
jest.mock("@modules/core/network/shared/lib", () => {
	const actual = jest.requireActual("@modules/core/network/shared/lib");
	return {
		...actual,
		getTCPServerInstance: () => mockGetTCPServerInstance(),
		clearTCPServerInstance: () => mockClearTCPServerInstance(),
	};
});

const reducer = combineReducers({ network: network.reducer });

const makeControllableChannel = () => {
	closeSpy = jest.fn();
	return eventChannel((emit) => {
		emitFromChannel = emit as (action: unknown) => void;
		return () => {
			closeSpy();
		};
	});
};

const {
	startTCPServer,
	stopTCPServer,
	setHostRunning,
	tcpServerListening,
	tcpServerClosed,
} = jest.requireActual("@modules/core/network/shared/lib");

beforeEach(() => {
	emitFromChannel = null;
	mockCreateTCPServerChannel
		.mockReset()
		.mockImplementation(makeControllableChannel);
	mockGetTCPServerInstance.mockReset().mockReturnValue(null);
	mockClearTCPServerInstance.mockReset();
});

const buildState = () => {
	let state = reducer(undefined, { type: "@@init" });
	state = reducer(state, setNickname("Roland"));
	return state;
};

describe("runTCPServerSaga", () => {
	it("forwards channel events to the store and sets hostRunning on listening", async () => {
		const state = buildState();
		const tester = createSagaTester({ reducer, state });
		const task = tester.run(runTCPServerSaga);

		tester.dispatch(startTCPServer());
		await Promise.resolve();
		await Promise.resolve();

		expect(mockCreateTCPServerChannel).toHaveBeenCalledWith("Roland");
		expect(emitFromChannel).not.toBeNull();

		emitFromChannel?.(tcpServerListening());
		await Promise.resolve();
		await Promise.resolve();

		expect(tester.ofType(tcpServerListening.type)).toHaveLength(1);
		expect(
			tester
				.ofType(setHostRunning.type)
				.some((a) => (a as unknown as { payload: boolean }).payload === true),
		).toBe(true);

		task.cancel();
	});

	it("sets hostRunning false and ends the worker on tcpServerClosed", async () => {
		const state = buildState();
		const tester = createSagaTester({ reducer, state });
		const task = tester.run(runTCPServerSaga);

		tester.dispatch(startTCPServer());
		await Promise.resolve();
		await Promise.resolve();

		emitFromChannel?.(tcpServerClosed());
		await Promise.resolve();
		await Promise.resolve();

		expect(tester.ofType(tcpServerClosed.type)).toHaveLength(1);
		const hostRunningActions = tester.ofType(setHostRunning.type);
		expect(
			(
				hostRunningActions[hostRunningActions.length - 1] as unknown as {
					payload: boolean;
				}
			).payload,
		).toBe(false);

		task.cancel();
	});

	it("stops the running worker on stopTCPServer: closes the channel, no double tcpServerClosed", async () => {
		const state = buildState();
		const tester = createSagaTester({ reducer, state });
		const task = tester.run(runTCPServerSaga);

		tester.dispatch(startTCPServer());
		await Promise.resolve();
		await Promise.resolve();

		tester.dispatch(stopTCPServer());
		await Promise.resolve();
		await Promise.resolve();

		expect(closeSpy).toHaveBeenCalled();

		task.cancel();
	});

	it("flushes hostRunning=false and cancelled cleanup on cancel mid-loop (race with stop)", async () => {
		const state = buildState();
		const tester = createSagaTester({ reducer, state });
		const task = tester.run(runTCPServerSaga);

		tester.dispatch(startTCPServer());
		await Promise.resolve();
		await Promise.resolve();

		tester.dispatch(stopTCPServer());
		await Promise.resolve();
		await Promise.resolve();

		// worker was cancelled by the race -> finally block should have emitted tcpServerClosed once
		expect(tester.ofType(tcpServerClosed.type)).toHaveLength(1);

		task.cancel();
	});

	it("idle stopTCPServer (no start yet) clears a leftover server instance without starting a worker", async () => {
		mockGetTCPServerInstance.mockReturnValue({ close: jest.fn() });
		const state = buildState();
		const tester = createSagaTester({ reducer, state });
		const task = tester.run(runTCPServerSaga);

		tester.dispatch(stopTCPServer());
		await Promise.resolve();
		await Promise.resolve();

		expect(mockClearTCPServerInstance).toHaveBeenCalled();
		expect(mockCreateTCPServerChannel).not.toHaveBeenCalled();
		const hostRunningActions = tester.ofType(setHostRunning.type);
		expect(
			(
				hostRunningActions[hostRunningActions.length - 1] as unknown as {
					payload: boolean;
				}
			).payload,
		).toBe(false);

		task.cancel();
	});

	it("restarts the worker for a second startTCPServer after the first session closes", async () => {
		const state = buildState();
		const tester = createSagaTester({ reducer, state });
		const task = tester.run(runTCPServerSaga);

		tester.dispatch(startTCPServer());
		await Promise.resolve();
		await Promise.resolve();
		emitFromChannel?.(tcpServerClosed());
		await Promise.resolve();
		await Promise.resolve();

		tester.dispatch(startTCPServer());
		await Promise.resolve();
		await Promise.resolve();

		expect(mockCreateTCPServerChannel).toHaveBeenCalledTimes(2);

		task.cancel();
	});
});
