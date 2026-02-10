import type { PayloadAction } from "@reduxjs/toolkit";
import type TcpSocket from "react-native-tcp-socket";

export const tcpSocketMap: Map<string, TcpSocket.Socket> = new Map();

export const clearTCPClientSockets = () => {
	tcpSocketMap.clear();
};

export const setTCPClientSocket = (
	networkId: string,
	socket: TcpSocket.Socket,
) => {
	tcpSocketMap.set(networkId, socket);
};

export const hasTCPClientSocket = (networkId: string) => {
	return tcpSocketMap.has(networkId);
};

export const getTCPClientSocketNetworkId = (socket: TcpSocket.Socket) => {
	const entries = Array.from(tcpSocketMap.entries());
	for (const [networkId, s] of entries) {
		if (s === socket) {
			return networkId;
		}
	}
	return null;
};

export const getTCPClientSocket = (networkId: string) => {
	return tcpSocketMap.get(networkId);
};

export const clearTCPClientSocketById = (networkId: string) => {
	tcpSocketMap.delete(networkId);
};

export const clearTCPClientSocket = (socket: TcpSocket.Socket) => {
	tcpSocketMap.forEach((s, networkId) => {
		if (s === socket) {
			tcpSocketMap.delete(networkId);
		}
	});
};

export const dispatchTCPServerAction = <T>(
	networkId: string,
	data: PayloadAction<T>,
) => {
	const socket = getTCPClientSocket(networkId);
	if (!socket) {
		console.error("TCPClientSocket not found");
		return;
	}

	socket.write(JSON.stringify(data));
};
