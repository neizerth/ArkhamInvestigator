import { log } from "@modules/core/log/shared/config";
import { seconds } from "@shared/lib";
import TcpSocket from "react-native-tcp-socket";
import type { ConnectionOptions } from "react-native-tcp-socket/lib/types/Socket";
import { eventChannel } from "redux-saga";
import {
	TCP_PORT,
	TCP_SERVER_WATCHDOG_PING,
} from "../../../../../../../shared/config";
import {
	clearTCPServerSocket,
	clearTCPServerSocketIfMatches,
	consumeTcpJsonBuffer,
	getTCPServerSocket,
	setClientRunning,
	setTCPServerSocket,
	tcpClientSocketClosed,
	tcpClientSocketConnected,
	tcpClientSocketDataReceived,
	tcpClientSocketError,
} from "../../../../../../../shared/lib";

export type TCPClientChannelAction =
	| ReturnType<typeof tcpClientSocketDataReceived>
	| ReturnType<typeof tcpClientSocketClosed>
	| ReturnType<typeof tcpClientSocketConnected>
	| ReturnType<typeof tcpClientSocketError>
	| ReturnType<typeof setClientRunning>;

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

		let inboundBuffer = "";

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
			if (getTCPServerSocket() !== socket) {
				return;
			}
			emit(setClientRunning(false));
			emit(tcpClientSocketClosed());
		});
		socket.on("data", (data) => {
			inboundBuffer += data.toString();
			const { messages, remainder } = consumeTcpJsonBuffer(
				inboundBuffer,
				TCP_SERVER_WATCHDOG_PING,
			);
			inboundBuffer = remainder;
			for (const jsonLine of messages) {
				emit(
					tcpClientSocketDataReceived({
						data: jsonLine,
					}),
				);
			}
		});

		return () => {
			log.warn("tcp client: event channel closed");
			const wasActive = getTCPServerSocket() === socket;
			try {
				socket.destroy();
			} catch {
				// socket may already be destroyed during takeover reconnect
			}
			if (wasActive) {
				clearTCPServerSocketIfMatches(socket);
				emit(setClientRunning(false));
			}
		};
	});
};
