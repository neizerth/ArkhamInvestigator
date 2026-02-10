import type { NetInfoState } from "@react-native-community/netinfo";
import { createAction } from "@reduxjs/toolkit";

export const networkInfoUpdated =
	createAction<NetInfoState>("network/available");

type ClientInfo = {
	networkId: string;
};

export const initNetworkClient = createAction<ClientInfo>(
	"network/initNetworkClient",
);
