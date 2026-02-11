import { getGlobalValue, setGlobalValue } from "@shared/lib/util";
import type TcpSocket from "react-native-tcp-socket";

const GLOBAL_HOST_SOCKET_KEY = "__tcpClientSocket" as const;

export const setTCPServerSocket = (socket: TcpSocket.Socket) => {
	setGlobalValue(GLOBAL_HOST_SOCKET_KEY, socket);
};

export const getTCPServerSocket = (): TcpSocket.Socket | null =>
	getGlobalValue<TcpSocket.Socket>(GLOBAL_HOST_SOCKET_KEY);

export const clearTCPServerSocket = () => {
	console.log("clearing tcp client socket");
	const socket = getTCPServerSocket();
	if (!socket) {
		return;
	}
	socket.destroy();
	setGlobalValue(GLOBAL_HOST_SOCKET_KEY, null);
};

// On HMR this module re-runs; close host socket from previous instance
// clearTCPServerSocket();
