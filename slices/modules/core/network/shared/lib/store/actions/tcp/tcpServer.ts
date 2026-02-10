import { createAction } from "@reduxjs/toolkit";
import type TcpSocket from "react-native-tcp-socket";

export const startTCPServer = createAction("network/startTCPServer");
type StopTCPServerPayload = {
	name: string | null;
};

export const stopTCPServer = createAction<StopTCPServerPayload>(
	"network/stopTCPServer",
);

type TcpSocketDataReceivedPayload = {
	socket: TcpSocket.Socket;
	data: string;
};
export const tcpServerSocketDataReceived =
	createAction<TcpSocketDataReceivedPayload>("network/socketDataReceived");

type TcpSocketClosedPayload = {
	socket: TcpSocket.Socket;
};
export const tcpServerSocketClosed = createAction<TcpSocketClosedPayload>(
	"network/tcpSocketClosed",
);

type TcpSocketConnectedPayload = {
	socket: TcpSocket.Socket;
};
export const tcpServerSocketConnected = createAction<TcpSocketConnectedPayload>(
	"network/tcpSocketConnected",
);

type TcpSocketErrorPayload = {
	socket: TcpSocket.Socket;
	error: Error;
};
export const tcpServerSocketError = createAction<TcpSocketErrorPayload>(
	"network/tcpSocketError",
);
