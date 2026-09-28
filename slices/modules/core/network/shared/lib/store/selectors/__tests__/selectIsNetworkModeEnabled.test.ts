import {
	network,
	setClientRunning,
	setHostRunning,
	setNetworkRole,
} from "@modules/core/network/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { selectIsNetworkModeEnabled } from "../selectIsNetworkModeEnabled";

const reducer = combineReducers({ network: network.reducer });

const dispatch = (...actions: Array<{ type: string; payload?: unknown }>) =>
	actions.reduce(
		(state, action) => reducer(state, action),
		reducer(undefined, { type: "@@INIT" }),
	);

describe("selectIsNetworkModeEnabled", () => {
	it("reflects hostRunning when the role is host", () => {
		expect(
			selectIsNetworkModeEnabled(
				dispatch(setNetworkRole("host"), setHostRunning(true)),
			),
		).toBe(true);
		expect(
			selectIsNetworkModeEnabled(
				dispatch(setNetworkRole("host"), setHostRunning(false)),
			),
		).toBe(false);
	});

	it("reflects clientRunning when the role is client", () => {
		expect(
			selectIsNetworkModeEnabled(
				dispatch(setNetworkRole("client"), setClientRunning(true)),
			),
		).toBe(true);
		expect(
			selectIsNetworkModeEnabled(
				dispatch(setNetworkRole("client"), setClientRunning(false)),
			),
		).toBe(false);
	});

	it("is false when there is no role, regardless of the running flags", () => {
		expect(
			selectIsNetworkModeEnabled(
				dispatch(
					setNetworkRole(null),
					setHostRunning(true),
					setClientRunning(true),
				),
			),
		).toBe(false);
	});
});
