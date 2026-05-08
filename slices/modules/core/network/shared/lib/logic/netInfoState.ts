import type { NetInfoState } from "@react-native-community/netinfo";

export const getNetInfoSSID = (state: NetInfoState) => {
	if (state.type === "wifi") {
		return state.details.ssid;
	}
	return null;
};

export const getNetInfoIP = (state: NetInfoState) => {
	if (state.type === "wifi" || state.type === "ethernet") {
		return state.details.ipAddress;
	}
	return null;
};

export const getNetworkInfoState = (state: NetInfoState) => {
	const ssid = getNetInfoSSID(state);
	const ip = getNetInfoIP(state);

	const networkType = state.type;
	const networkConnected = Boolean(state.isConnected);
	const wifiEnabled = Boolean(state.isWifiEnabled);
	const offline = state.isInternetReachable === false;

	return { ssid, ip, networkType, networkConnected, wifiEnabled, offline };
};
