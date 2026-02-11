import type { NetworkOutcomeAction } from "@modules/core/network/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type TcpSocket from "react-native-tcp-socket";

export type SendTCPActionPayload = {
	socket: TcpSocket.Socket;
	action: NetworkOutcomeAction<unknown>;
};

export const sendTCPAction = createAction<SendTCPActionPayload>(
	"network/sendTCPAction",
);
