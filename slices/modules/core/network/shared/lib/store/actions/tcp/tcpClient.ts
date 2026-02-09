import { createAction } from "@reduxjs/toolkit";

export const startTCPClient = createAction<{ host: string }>(
	"network/startTCPClient",
);
export const stopTCPClient = createAction("network/stopTCPClient");

type TcpSocketDataReceivedPayload = {
	data: string;
};
export const tcpClientSocketDataReceived =
	createAction<TcpSocketDataReceivedPayload>("network/socketDataReceived");

export const tcpClientSocketClosed = createAction("network/tcpSocketClosed");

export const tcpClientSocketConnected = createAction(
	"network/tcpSocketConnected",
);

type TcpSocketErrorPayload = {
	error: Error;
};
export const tcpClientSocketError = createAction<TcpSocketErrorPayload>(
	"network/tcpSocketError",
);
