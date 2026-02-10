import { createAction } from "@reduxjs/toolkit";

export const startTCPClient = createAction<{ host: string }>(
	"network/startTCPClient",
);
export const stopTCPClient = createAction("network/stopTCPClient");

type TcpSocketDataReceivedPayload = {
	data: string;
};
export const tcpClientSocketDataReceived =
	createAction<TcpSocketDataReceivedPayload>(
		"network/tcpClientSocketDataReceived",
	);

export const tcpClientSocketClosed = createAction(
	"network/tcpClientSocketClosed",
);

export const tcpClientSocketConnected = createAction(
	"network/tcpClientSocketConnected",
);

type TcpSocketErrorPayload = {
	error: Error;
};
export const tcpClientSocketError = createAction<TcpSocketErrorPayload>(
	"network/tcpClientSocketError",
);
