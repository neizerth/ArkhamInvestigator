import type { NetInfoState } from "@react-native-community/netinfo";
import { createAction } from "@reduxjs/toolkit";
import { withRemoteMeta } from "../../logic";

export const networkInfoUpdated =
	createAction<NetInfoState>("network/available");

type ConnectNetworkClientPayload = {
	nickname: string;
};

export const connectNetworkClient = createAction(
	"network/connectNetworkClient",
	withRemoteMeta<ConnectNetworkClientPayload>({
		notify: "host",
	}),
);
