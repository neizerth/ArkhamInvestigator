import { log } from "@shared/config";
import { seconds } from "@shared/lib";
import TcpSocket from "react-native-tcp-socket";
import type { ConnectionOptions } from "react-native-tcp-socket/lib/types/Socket";
import { eventChannel } from "redux-saga";
import { TCP_PORT } from "../../../../shared/config";
import {
	clearTCPServerSocket,
	setClientRunning,
	setTCPServerSocket,
	tcpClientSocketClosed,
	tcpClientSocketConnected,
	tcpClientSocketDataReceived,
	tcpClientSocketError,
} from "../../../../shared/lib";

export type TCPClientChannelAction =
	| ReturnType<typeof tcpClientSocketDataReceived>
	| ReturnType<typeof tcpClientSocketClosed>
	| ReturnType<typeof tcpClientSocketConnected>
	| ReturnType<typeof tcpClientSocketError>
	| ReturnType<typeof setClientRunning>;

// On HMR this module re-runs; clear stale client socket from previous instance
clearTCPServerSocket();

export const createTCPClientChannel = (host: string) => {
	return eventChannel((emit) => {
		clearTCPServerSocket();

		console.log("tcp client: event channel created");

		const options: ConnectionOptions = {
			host,
			port: TCP_PORT,
			connectTimeout: seconds(3),
		};

		const socket = TcpSocket.createConnection(options, () => {
			log.info(
				"tcp client: connecting to",
				{ host, port: TCP_PORT },
				"local",
				socket.address(),
			);
		});

		setTCPServerSocket(socket);

		socket.on("connect", () => {
			log.info("tcp client: socket connected");
			emit(setClientRunning(true));
			emit(tcpClientSocketConnected());
		});

		socket.on("error", (error) => {
			log.error("tcp client: socket error", error);
			emit(tcpClientSocketError({ error }));
		});
		socket.on("close", () => {
			log.warn("tcp client: disconnected from host");
			emit(setClientRunning(false));
			emit(tcpClientSocketClosed());
		});
		socket.on("data", (data) => {
			emit(
				tcpClientSocketDataReceived({
					data: data.toString(),
				}),
			);
		});

		return () => {
			log.warn("tcp client: event channel closed");
			emit(setClientRunning(false));
			socket.destroy();
		};
	});
};
