import type { PayloadAction } from "@reduxjs/toolkit";
import { getGlobalValue, setGlobalValue } from "@shared/lib/util";
import type TcpSocket from "react-native-tcp-socket";

const GLOBAL_SERVER_KEY = "__tcpServerChannelServer" as const;
export const tcpSocketMap: Map<string, TcpSocket.Socket> = new Map();

export const clearTCPClientSockets = () => {
	console.log("clearing tcp client sockets");
	for (const socket of tcpSocketMap.values()) {
		socket.destroy();
	}
	tcpSocketMap.clear();
};

export const getTCPClientSockets = () => {
	return Array.from(tcpSocketMap.values());
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
	const socket = tcpSocketMap.get(networkId);
	if (!socket) {
		return;
	}
	console.log("clearing tcp client socket by id", networkId);
	socket.destroy();
	tcpSocketMap.delete(networkId);
};

export const clearTCPClientSocket = (socket: TcpSocket.Socket) => {
	tcpSocketMap.forEach((s, networkId) => {
		if (s === socket) {
			s.destroy();
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

	socket.write(`${JSON.stringify(data)}\n`);
};

export const getTCPServerInstance = (): TcpSocket.Server | null =>
	getGlobalValue<TcpSocket.Server>(GLOBAL_SERVER_KEY);

export const setTCPServerInstance = (server: TcpSocket.Server | null) => {
	setGlobalValue(GLOBAL_SERVER_KEY, server);
};

export const clearTCPServerInstance = () => {
	const server = getTCPServerInstance();
	if (!server) {
		return;
	}
	console.log("clearing tcp server instance");
	server.close();
	setTCPServerInstance(null);
};

/**
 * Single point of HMR cleanup: on module re-run, clear server and client sockets
 * from the previous instance. Channel modules rely on this when they import shared/lib.
 */
clearTCPServerInstance();
clearTCPClientSockets();
