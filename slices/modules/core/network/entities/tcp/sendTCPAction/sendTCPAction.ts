import { type PayloadAction, createAction } from "@reduxjs/toolkit";
import type TcpSocket from "react-native-tcp-socket";

export type SendTCPActionPayload = {
	socket: TcpSocket.Socket;
	action: PayloadAction<unknown>;
};

export const sendTCPAction = createAction<SendTCPActionPayload>(
	"network/sendTCPAction",
);
