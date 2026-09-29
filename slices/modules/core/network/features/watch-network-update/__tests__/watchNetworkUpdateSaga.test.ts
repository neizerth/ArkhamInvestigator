import { appStarted } from "@modules/core/app/shared/lib";
import { network } from "@modules/core/network/shared/lib";
import {
	internetReachabilityChanged,
	networkInfoUpdated,
} from "@modules/core/network/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { eventChannel } from "redux-saga";
import { watchNetworkUpdateSaga } from "../watchNetworkUpdateSaga";

let emitFromChannel: ((action: unknown) => void) | null = null;
const mockNetworkChannel = jest.fn();
jest.mock("../networkChannel", () => ({
	networkChannel: (...args: unknown[]) => mockNetworkChannel(...args),
}));

beforeEach(() => {
	emitFromChannel = null;
	mockNetworkChannel.mockReset().mockImplementation(() =>
		eventChannel((emit) => {
			emitFromChannel = emit as (action: unknown) => void;
			return () => {};
		}),
	);
});

const reducer = combineReducers({ network: network.reducer });

const netInfo = (overrides: Record<string, unknown> = {}) => ({
	type: "wifi",
	isConnected: true,
	isWifiEnabled: true,
	isInternetReachable: null,
	details: { ssid: "MyWifi", ipAddress: "192.168.1.5" },
	...overrides,
});

describe("watchNetworkUpdateSaga", () => {
	it("does nothing until appStarted fires", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(watchNetworkUpdateSaga);

		await Promise.resolve();
		expect(mockNetworkChannel).not.toHaveBeenCalled();
	});

	it("derives and dispatches network state fields from a NetInfo update", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(watchNetworkUpdateSaga);

		tester.dispatch(appStarted());
		await Promise.resolve();

		emitFromChannel?.(networkInfoUpdated(netInfo() as never));
		await Promise.resolve();
		await Promise.resolve();

		expect(tester.getState().network.ssid).toBe("MyWifi");
		expect(tester.getState().network.ip).toBe("192.168.1.5");
		expect(tester.getState().network.networkType).toBe("wifi");
		expect(tester.getState().network.networkConnected).toBe(true);
		expect(tester.getState().network.wifiEnabled).toBe(true);
		expect(tester.getState().network.offline).toBe(false);
	});

	it("does not treat the first known reachability state as a change", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(watchNetworkUpdateSaga);
		tester.dispatch(appStarted());
		await Promise.resolve();

		emitFromChannel?.(
			networkInfoUpdated(netInfo({ isInternetReachable: true }) as never),
		);
		await Promise.resolve();
		await Promise.resolve();

		expect(tester.ofType(internetReachabilityChanged.type)).toHaveLength(0);
	});

	it("dispatches internetReachabilityChanged only when reachability actually flips", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(watchNetworkUpdateSaga);
		tester.dispatch(appStarted());
		await Promise.resolve();

		emitFromChannel?.(
			networkInfoUpdated(netInfo({ isInternetReachable: true }) as never),
		);
		await Promise.resolve();
		await Promise.resolve();

		emitFromChannel?.(
			networkInfoUpdated(netInfo({ isInternetReachable: true }) as never),
		);
		await Promise.resolve();
		await Promise.resolve();
		expect(tester.ofType(internetReachabilityChanged.type)).toHaveLength(0);

		emitFromChannel?.(
			networkInfoUpdated(netInfo({ isInternetReachable: false }) as never),
		);
		await Promise.resolve();
		await Promise.resolve();

		expect(tester.ofType(internetReachabilityChanged.type)).toHaveLength(1);
		expect(
			(
				tester.ofType(internetReachabilityChanged.type)[0] as never as {
					payload: boolean;
				}
			).payload,
		).toBe(false);
	});

	it("treats unknown (null) reachability as not-offline rather than offline", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(watchNetworkUpdateSaga);
		tester.dispatch(appStarted());
		await Promise.resolve();

		emitFromChannel?.(
			networkInfoUpdated(netInfo({ isInternetReachable: null }) as never),
		);
		await Promise.resolve();
		await Promise.resolve();

		expect(tester.getState().network.offline).toBe(false);
	});

	it("only subscribes once even if appStarted fires more than once (takeOnce)", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(watchNetworkUpdateSaga);

		tester.dispatch(appStarted());
		await Promise.resolve();
		tester.dispatch(appStarted());
		await Promise.resolve();

		expect(mockNetworkChannel).toHaveBeenCalledTimes(1);
	});
});
