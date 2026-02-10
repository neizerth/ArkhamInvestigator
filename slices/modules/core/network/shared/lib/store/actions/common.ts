import type { NetInfoState } from "@react-native-community/netinfo";
import { createAction } from "@reduxjs/toolkit";

export const networkInfoUpdated =
	createAction<NetInfoState>("network/available");

type InitNetworkClientPayload = {
	nickname: string;
};

export const initNetworkClient = createAction<InitNetworkClientPayload>(
	"network/initNetworkClient",
);
