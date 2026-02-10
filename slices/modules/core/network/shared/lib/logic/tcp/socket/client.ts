import type { PayloadAction } from "@reduxjs/toolkit";
import type TcpSocket from "react-native-tcp-socket";

let tcpHostSocket: TcpSocket.Socket | null = null;

export const setTCPServerSocket = (socket: TcpSocket.Socket) => {
	tcpHostSocket = socket;
};

export const getTCPServerSocket = () => {
	return tcpHostSocket;
};

export const clearTCPServerSocket = () => {
	tcpHostSocket = null;
};

export const dispatchTCPClientAction = <T>(data: PayloadAction<T>) => {
	if (!tcpHostSocket) {
		console.error("TCPServerSocket not found");
		return;
	}

	tcpHostSocket.write(JSON.stringify(data));
};
