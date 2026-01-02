import { createSlice } from "@reduxjs/toolkit";
import { omit } from "ramda";
import { createSliceState } from "redux-toolkit-helpers";
import type { NetworkType } from "../../model";

export type NetworkState = {
	networkType: NetworkType;
	networkConnected: boolean;
	offline: boolean;
	wifiEnabled: boolean;
	ip: string | null;
	ssid: string | null;
	nickname: string | null;
};

const initialState: NetworkState = {
	networkType: "none",
	networkConnected: false,
	offline: false,
	wifiEnabled: false,
	ip: null,
	ssid: null,
	nickname: null,
};

const state = createSliceState(initialState);

export const network = createSlice({
	name: "network",
	...state,
	reducers: {
		...omit(["setIp", "setSsid"], state.reducers),
		setIP: state.reducers.setIp,
		setSSID: state.reducers.setSsid,
	},
	selectors: {
		...omit(["selectIp", "selectSsid"], state.selectors),
		selectIP: state.selectors.selectIp,
		selectSSID: state.selectors.selectSsid,
	},
});

export const {
	setOffline,
	setWifiEnabled,
	setIP,
	setSSID,
	setNetworkConnected,
	setNetworkType,
	setNickname,
} = network.actions;

export const {
	selectOffline,
	selectWifiEnabled,
	selectIP,
	selectSSID,
	selectNetworkConnected,
	selectNetworkType,
	selectNickname,
} = network.selectors;

export default network.reducer;
