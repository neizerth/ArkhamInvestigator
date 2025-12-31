import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type NetworkState = {
	offline: boolean;
	wifiEnabled: boolean;
};

const initialState: NetworkState = {
	offline: false,
	wifiEnabled: false,
};

const state = createSliceState(initialState);

export const network = createSlice({
	name: "network",
	...state,
});

export const { setOffline, setWifiEnabled } = network.actions;

export const { selectOffline, selectWifiEnabled } = network.selectors;

export default network.reducer;
