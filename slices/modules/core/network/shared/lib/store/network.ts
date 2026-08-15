import { createSlice } from "@reduxjs/toolkit";
import { omit } from "ramda";
import { createSliceState } from "redux-toolkit-helpers";
import type { NetworkRole, NetworkType } from "../../model";

export type NetworkState = {
	deviceNetworkId: string;
	hostRunning: boolean;
	clientRunning: boolean;
	networkType: NetworkType;
	networkConnected: boolean;
	offline: boolean;
	wifiEnabled: boolean;
	ip: string | null;
	ssid: string | null;
	nickname: string;
	networkRole: NetworkRole | null;
	hostIP: string | null;
	networkDiscoveryEnabled: boolean;
	hotspotEnabled?: boolean;
};

/**
 * Placeholder until `initDeviceNetworkIdSaga` assigns a real uuid on first launch. Kept as a
 * recognizable constant (rather than an empty string) because installs from before that saga
 * persisted this exact value and must be re-initialized too.
 */
export const UNINITIALIZED_DEVICE_NETWORK_ID =
	"00000000-0000-0000-0000-000000000000";

const initialState: NetworkState = {
	deviceNetworkId: UNINITIALIZED_DEVICE_NETWORK_ID,
	hostRunning: false,
	clientRunning: false,
	networkType: "none",
	networkConnected: false,
	offline: false,
	wifiEnabled: false,
	ip: null,
	ssid: null,
	nickname: "",
	networkRole: null,
	hostIP: null,
	networkDiscoveryEnabled: false,
	hotspotEnabled: false,
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
	setHostIP,
	setDeviceNetworkId,
	setHostRunning,
	setClientRunning,
	setNetworkDiscoveryEnabled,
	setHotspotEnabled,
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
	selectHostIP,
	selectDeviceNetworkId,
	selectHostRunning,
	selectClientRunning,
	selectNetworkDiscoveryEnabled,
	selectHotspotEnabled,
} = network.selectors;

export default network.reducer;
