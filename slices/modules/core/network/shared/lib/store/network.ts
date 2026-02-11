import "react-native-get-random-values";
import { createSlice } from "@reduxjs/toolkit";
import { omit } from "ramda";
import { createSliceState } from "redux-toolkit-helpers";
import { v4 } from "uuid";
import type { NetworkRole, NetworkType } from "../../model";

export type NetworkState = {
	deviceNetworkId: string;
	hostRunning: boolean;
	networkType: NetworkType;
	networkConnected: boolean;
	offline: boolean;
	wifiEnabled: boolean;
	ip: string | null;
	ssid: string | null;
	nickname: string;
	networkRole: NetworkRole | null;
	hostIp: string | null;
};

const initialState: NetworkState = {
	deviceNetworkId: v4(),
	hostRunning: false,
	networkType: "none",
	networkConnected: false,
	offline: false,
	wifiEnabled: false,
	ip: null,
	ssid: null,
	nickname: "",
	networkRole: null,
	hostIp: null,
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
	setNetworkRole,
	setHostIp,
	setDeviceNetworkId,
	setHostRunning,
} = network.actions;

export const {
	selectOffline,
	selectWifiEnabled,
	selectIP,
	selectSSID,
	selectNetworkConnected,
	selectNetworkType,
	selectNickname,
	selectNetworkRole,
	selectHostIp,
	selectDeviceNetworkId,
	selectHostRunning,
} = network.selectors;

export default network.reducer;
