import { getGlobalValue, setGlobalValue } from "@shared/lib/util";
import type TcpSocket from "react-native-tcp-socket";

const GLOBAL_HOST_SOCKET_KEY = "__tcpClientSocket" as const;

export const setTCPServerSocket = (socket: TcpSocket.Socket) => {
	setGlobalValue(GLOBAL_HOST_SOCKET_KEY, socket);
};

export const getTCPServerSocket = (): TcpSocket.Socket | null =>
	getGlobalValue<TcpSocket.Socket>(GLOBAL_HOST_SOCKET_KEY);

export const clearTCPServerSocket = () => {
	const socket = getTCPServerSocket();
	if (socket) {
		console.log("clearing tcp client socket");
		socket.destroy();
	}
	setGlobalValue(GLOBAL_HOST_SOCKET_KEY, null);
};

// On HMR this module re-runs; clear stale client socket from previous instance
clearTCPServerSocket();
