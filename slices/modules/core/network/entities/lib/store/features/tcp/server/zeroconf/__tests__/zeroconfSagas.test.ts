import {
	network,
	restartTCPServerZeroconf,
	setDeviceNetworkId,
	setNickname,
	startTCPServerZeroconf,
	stopTCPServerZeroconf,
} from "@modules/core/network/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { stateAfter } from "@shared/lib/test/stateAfter";
import { restartTCPServerZeroconfSaga } from "../restartTCPServerZeroconfSaga";
import { startTCPServerZeroconfSaga } from "../startTCPServerZeroconfSaga";
import { stopTCPServerZeroconfSaga } from "../stopTCPServerZeroconfSaga";

const mockPublishZeroconfService = jest.fn();
const mockUnpublishZeroconfServiceByNetworkId = jest.fn();
jest.mock("@modules/core/network/shared/lib", () => {
	const actual = jest.requireActual("@modules/core/network/shared/lib");
	return {
		...actual,
		publishZeroconfService: (...args: unknown[]) =>
			mockPublishZeroconfService(...args),
		unpublishZeroconfServiceByNetworkId: (...args: unknown[]) =>
			mockUnpublishZeroconfServiceByNetworkId(...args),
	};
});

const reducer = combineReducers({ network: network.reducer });

beforeEach(() => {
	mockPublishZeroconfService.mockReset();
	mockUnpublishZeroconfServiceByNetworkId.mockReset();
});

describe("startTCPServerZeroconfSaga", () => {
	it("publishes the zeroconf service using nickname and device network id", async () => {
		const state = stateAfter(
			reducer,
			setNickname("Roland"),
			setDeviceNetworkId("net-1"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(startTCPServerZeroconfSaga);

		tester.dispatch(startTCPServerZeroconf());
		await Promise.resolve();

		expect(mockPublishZeroconfService).toHaveBeenCalledWith({
			name: "Roland",
			networkId: "net-1",
		});
	});

	it("falls back to the default server name when nickname is blank", async () => {
		const state = stateAfter(
			reducer,
			setNickname("   "),
			setDeviceNetworkId("net-2"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(startTCPServerZeroconfSaga);

		tester.dispatch(startTCPServerZeroconf());
		await Promise.resolve();

		const call = mockPublishZeroconfService.mock.calls[0][0];
		expect(call.networkId).toBe("net-2");
		expect(call.name).not.toBe("   ");
		expect(call.name.length).toBeGreaterThan(0);
	});
});

describe("stopTCPServerZeroconfSaga", () => {
	it("unpublishes the zeroconf service for the current device network id", async () => {
		const state = stateAfter(reducer, setDeviceNetworkId("net-3"));
		const tester = createSagaTester({ reducer, state });
		tester.run(stopTCPServerZeroconfSaga);

		tester.dispatch(stopTCPServerZeroconf());
		await Promise.resolve();

		expect(mockUnpublishZeroconfServiceByNetworkId).toHaveBeenCalledWith(
			"net-3",
		);
	});
});

describe("restartTCPServerZeroconfSaga", () => {
	it("dispatches stop then start on restart", async () => {
		const state = reducer(undefined, { type: "@@init" });
		const tester = createSagaTester({ reducer, state });
		tester.run(restartTCPServerZeroconfSaga);

		tester.dispatch(restartTCPServerZeroconf());
		await Promise.resolve();

		expect(tester.ofType(stopTCPServerZeroconf.type)).toHaveLength(1);
		expect(tester.ofType(startTCPServerZeroconf.type)).toHaveLength(1);
	});
});
