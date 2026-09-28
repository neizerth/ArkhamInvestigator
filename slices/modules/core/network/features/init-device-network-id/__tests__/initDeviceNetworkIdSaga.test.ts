import { appStarted } from "@modules/core/app/shared/lib";
import {
	UNINITIALIZED_DEVICE_NETWORK_ID,
	network,
	setDeviceNetworkId,
} from "@modules/core/network/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { initDeviceNetworkIdSaga } from "../initDeviceNetworkIdSaga";

const reducer = combineReducers({ network: network.reducer });

/**
 * C1 fix verification (audit/multiplayer.md): a fresh install used to keep the placeholder
 * deviceNetworkId forever, because it was only reassigned by a persist migration that never runs
 * against `initialState`. `initDeviceNetworkIdSaga` now assigns a fresh uuid directly on
 * `appStarted` whenever the id is still the placeholder — this test confirms that fix holds.
 */
describe("initDeviceNetworkIdSaga - C1 fix", () => {
	it("assigns a fresh uuid on appStarted when the id is still the uninitialized placeholder", () => {
		const tester = createSagaTester({ reducer });
		tester.run(initDeviceNetworkIdSaga);

		tester.dispatch(appStarted());

		const setActions = tester.ofType(setDeviceNetworkId.type);
		expect(setActions).toHaveLength(1);

		const newId = (setActions[0] as ReturnType<typeof setDeviceNetworkId>)
			.payload;
		expect(newId).not.toBe(UNINITIALIZED_DEVICE_NETWORK_ID);
		expect(newId).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
		);
		expect(tester.getState().network.deviceNetworkId).toBe(newId);
	});

	it("does nothing when a real id is already assigned", () => {
		const existingId = "11111111-1111-1111-1111-111111111111";
		const preloadedState = reducer(undefined, { type: "@@init" });
		const state = {
			network: { ...preloadedState.network, deviceNetworkId: existingId },
		};

		const tester = createSagaTester({ reducer, state });
		tester.run(initDeviceNetworkIdSaga);

		tester.dispatch(appStarted());

		expect(tester.ofType(setDeviceNetworkId.type)).toHaveLength(0);
		expect(tester.getState().network.deviceNetworkId).toBe(existingId);
	});

	it("only reacts to appStarted once (takeOnce)", () => {
		const tester = createSagaTester({ reducer });
		tester.run(initDeviceNetworkIdSaga);

		tester.dispatch(appStarted());
		tester.dispatch(appStarted());

		expect(tester.ofType(setDeviceNetworkId.type)).toHaveLength(1);
	});
});
