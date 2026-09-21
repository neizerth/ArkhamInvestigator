import type { NetInfoState } from "@react-native-community/netinfo";
import { createAction } from "@reduxjs/toolkit";
import type { NetworkOutcomeAction } from "../../../model";
import { withRemoteMeta } from "../../logic";

export const networkInfoUpdated =
	createAction<NetInfoState>("network/available");

export const internetReachabilityChanged = createAction<boolean>(
	"network/internetReachabilityChanged",
);

type ConnectNetworkClientPayload = {
	nickname: string;
	hostIP: string;
};

export const connectNetworkClient = createAction(
	"network/connectNetworkClient",
	withRemoteMeta<ConnectNetworkClientPayload>({
		notify: "host",
	}),
);

export const sendNetworkKeepAlive = createAction(
	"network/sendKeepAlive",
	withRemoteMeta({
		notify: "host",
	}),
);

type SendRemoteActionPayload = {
	action: NetworkOutcomeAction<unknown>;
};

export const sendRemoteAction = createAction<SendRemoteActionPayload>(
	"network/sendRemoteAction",
);
