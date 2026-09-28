import {
	network,
	setIP,
	setNetworkConnected,
	setNetworkRole,
	setNetworkType,
	setNickname,
} from "@modules/core/network/shared/lib";
import { router } from "@modules/core/router/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { runTCPServerSelfDiscoverySaga } from "../runTCPServerSelfDiscoverySaga";

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);
jest.mock("@modules/core/log/shared/config", () => ({
	tcpLog: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

const mockRequestAndroidPermission = jest.fn();
jest.mock("@modules/core/device/shared/lib/logic", () => ({
	requestAndroidPermission: (type: string) =>
		mockRequestAndroidPermission(type),
}));

const mockGetZeroconfServices = jest.fn();
const mockAcquireZeroconfScan = jest.fn();
const mockReleaseZeroconfScan = jest.fn();
const mockRestartZeroconfScan = jest.fn();
jest.mock("@modules/core/network/shared/lib", () => {
	const actual = jest.requireActual("@modules/core/network/shared/lib");
	return {
		...actual,
		getZeroconfServices: () => mockGetZeroconfServices(),
		acquireZeroconfScan: () => mockAcquireZeroconfScan(),
		releaseZeroconfScan: () => mockReleaseZeroconfScan(),
		restartZeroconfScan: () => mockRestartZeroconfScan(),
	};
});

const reducer = combineReducers({
	network: network.reducer,
	router: router.reducer,
});

beforeEach(() => {
	jest.useFakeTimers();
	mockRequestAndroidPermission.mockReset().mockResolvedValue(null); // non-Android: null
	mockGetZeroconfServices.mockReset().mockReturnValue([]);
	mockAcquireZeroconfScan.mockReset();
	mockReleaseZeroconfScan.mockReset();
	mockRestartZeroconfScan.mockReset();
});

afterEach(() => {
	jest.useRealTimers();
});

const buildState = (overrides: Record<string, unknown> = {}) => {
	let state = reducer(undefined, { type: "@@init" });
	state = reducer(state, setNickname("Roland"));
	state = reducer(state, setNetworkConnected(true));
	state = reducer(state, setNetworkType("wifi" as never));
	for (const [key, value] of Object.entries(overrides)) {
		if (key === "networkConnected")
			state = reducer(state, setNetworkConnected(value as boolean));
		if (key === "networkType")
			state = reducer(state, setNetworkType(value as never));
	}
	return state;
};

describe("runTCPServerSelfDiscoverySaga", () => {
	it("does nothing for a non-host role", async () => {
		const state = buildState();
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPServerSelfDiscoverySaga);

		tester.dispatch(setNetworkRole("client"));
		await Promise.resolve();

		expect(mockAcquireZeroconfScan).not.toHaveBeenCalled();
	});

	it("bails without starting the scan when Android permission is denied", async () => {
		mockRequestAndroidPermission.mockResolvedValue("denied");
		const state = buildState();
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPServerSelfDiscoverySaga);

		tester.dispatch(setNetworkRole("host"));
		await Promise.resolve();
		await Promise.resolve();

		expect(mockAcquireZeroconfScan).not.toHaveBeenCalled();
	});

	it("adopts the self-discovered IP when NetInfo has none (hotspot case)", async () => {
		mockGetZeroconfServices.mockReturnValue([
			{ name: "Roland", addresses: ["192.168.43.1"] },
		]);
		const state = buildState({ networkConnected: false, networkType: "none" });
		const tester = createSagaTester({ reducer, state });
		const task = tester.run(runTCPServerSelfDiscoverySaga);

		tester.dispatch(setNetworkRole("host"));
		await Promise.resolve();
		await Promise.resolve();

		await jest.advanceTimersByTimeAsync(1000);
		await Promise.resolve();
		await Promise.resolve();

		expect(tester.ofType(setIP.type)).toHaveLength(1);
		expect(
			(tester.ofType(setIP.type)[0] as ReturnType<typeof setIP>).payload,
		).toBe("192.168.43.1");

		task.cancel();
	});

	it("ignores the self-discovered IP when NetInfo already provides a normal LAN address", async () => {
		mockGetZeroconfServices.mockReturnValue([
			{ name: "Roland", addresses: ["192.168.43.1"] },
		]);
		// networkConnected true + type wifi (not "none") -> useZeroconfIp is false
		const state = buildState({ networkConnected: true, networkType: "wifi" });
		const tester = createSagaTester({ reducer, state });
		const task = tester.run(runTCPServerSelfDiscoverySaga);

		tester.dispatch(setNetworkRole("host"));
		await Promise.resolve();
		await Promise.resolve();

		await jest.advanceTimersByTimeAsync(1000);
		await Promise.resolve();
		await Promise.resolve();

		expect(tester.ofType(setIP.type)).toHaveLength(0);

		task.cancel();
	});

	it("does not restart the server if NetInfo already has a usable LAN IP, even if self-discovery times out", async () => {
		const state = buildState({ networkConnected: true, networkType: "wifi" });
		const stateWithIp = reducer(state, setIP("10.0.0.5"));
		const tester = createSagaTester({ reducer, state: stateWithIp });
		const task = tester.run(runTCPServerSelfDiscoverySaga);

		tester.dispatch(setNetworkRole("host"));
		await Promise.resolve();
		await Promise.resolve();

		// advance past SELF_DISCOVERY_TIMEOUT_MS (5000ms) with zeroconf never finding us
		await jest.advanceTimersByTimeAsync(6000);
		await Promise.resolve();
		await Promise.resolve();

		expect(mockRestartZeroconfScan).not.toHaveBeenCalled();

		task.cancel();
	});

	it("restarts the server after the self-discovery timeout when NetInfo also has nothing usable", async () => {
		const state = buildState({ networkConnected: false, networkType: "none" });
		const tester = createSagaTester({ reducer, state });
		const task = tester.run(runTCPServerSelfDiscoverySaga);

		tester.dispatch(setNetworkRole("host"));
		await Promise.resolve();
		await Promise.resolve();

		await jest.advanceTimersByTimeAsync(6000);
		await Promise.resolve();
		await Promise.resolve();

		expect(mockRestartZeroconfScan).toHaveBeenCalled();
		expect(tester.ofType("network/restartTCPServer")).toHaveLength(1);

		task.cancel();
	});

	it("does not overlap restarts within the cooldown window", async () => {
		const state = buildState({ networkConnected: false, networkType: "none" });
		const tester = createSagaTester({ reducer, state });
		const task = tester.run(runTCPServerSelfDiscoverySaga);

		tester.dispatch(setNetworkRole("host"));
		await Promise.resolve();
		await Promise.resolve();

		// first timeout -> restart
		await jest.advanceTimersByTimeAsync(6000);
		await Promise.resolve();
		await Promise.resolve();
		expect(tester.ofType("network/restartTCPServer")).toHaveLength(1);

		// let the post-restart race (3000ms timeout branch) resolve
		await jest.advanceTimersByTimeAsync(3000);
		await Promise.resolve();

		// well within RESTART_COOLDOWN_MS (15000ms) of the first restart -> a second timeout should
		// not trigger another restart yet
		await jest.advanceTimersByTimeAsync(6000);
		await Promise.resolve();
		await Promise.resolve();

		expect(tester.ofType("network/restartTCPServer")).toHaveLength(1);

		task.cancel();
	});

	it("stops the loop and releases the scan when the role changes away from host", async () => {
		const state = buildState();
		const tester = createSagaTester({ reducer, state });
		tester.run(runTCPServerSelfDiscoverySaga);

		tester.dispatch(setNetworkRole("host"));
		await Promise.resolve();
		await Promise.resolve();
		expect(mockAcquireZeroconfScan).toHaveBeenCalledTimes(1);

		tester.dispatch(setNetworkRole("client"));
		await jest.advanceTimersByTimeAsync(1000);
		await Promise.resolve();
		await Promise.resolve();

		expect(mockReleaseZeroconfScan).toHaveBeenCalledTimes(1);
	});
});
