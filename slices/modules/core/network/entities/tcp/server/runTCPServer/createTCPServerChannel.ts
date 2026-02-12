import { log } from "@shared/config";
import TcpSocket from "react-native-tcp-socket";
import Zeroconf from "react-native-zeroconf";
import { eventChannel } from "redux-saga";
import {
	TCP_HOST,
	TCP_PORT,
	TCP_SERVER_NAME,
	TCP_SERVICE_NAME,
} from "../../../../shared/config";
import {
	clearTCPClientSockets,
	clearTCPServerInstance,
	setHostRunning,
	setTCPServerInstance,
	tcpServerClosed,
	tcpServerError,
	tcpServerListening,
	tcpServerSocketClosed,
	tcpServerSocketConnected,
	tcpServerSocketDataReceived,
	tcpServerSocketError,
} from "../../../../shared/lib";

export type TCPServerChannelAction =
	| ReturnType<typeof tcpServerSocketDataReceived>
	| ReturnType<typeof tcpServerSocketClosed>
	| ReturnType<typeof tcpServerSocketConnected>
	| ReturnType<typeof tcpServerSocketError>
	| ReturnType<typeof tcpServerListening>;

// On HMR this module re-runs; close server from previous instance
clearTCPServerInstance();
clearTCPClientSockets();

export const createTCPServerChannel = (serverName: string | null) => {
	return eventChannel((emit) => {
		clearTCPServerInstance();
		clearTCPClientSockets();
		const zeroconf = new Zeroconf();

		const server = TcpSocket.createServer((socket) => {
			socket.on("error", (error) => {
				log.error("tcp server: client socket error", error);
				emit(
					tcpServerSocketError({
						socket,
						error,
					}),
				);
			});
			socket.on("connect", () => {
				log.info("tcp server: client socket connected");
				emit(
					tcpServerSocketConnected({
						socket,
					}),
				);
			});
			socket.on("close", () => {
				log.info("tcp server: client disconnected");
				emit(
					tcpServerSocketClosed({
						socket,
					}),
				);
			});
			socket.on("data", (data) => {
				emit(
					tcpServerSocketDataReceived({
						socket,
						data: data.toString(),
					}),
				);
			});
		});

		setTCPServerInstance(server);

		server.listen({
			port: TCP_PORT,
			host: TCP_HOST,
		});

		server
			.on("listening", () => {
				log.info("tcp server: listening", server.address());
				emit(tcpServerListening());
			})
			.on("error", (error) => {
				log.error("tcp server error", error);
				emit(
					tcpServerError({
						error,
					}),
				);
			})
			.on("close", () => {
				log.warn("tcp server: stopped (port released)");
				emit(setHostRunning(false));
				emit(tcpServerClosed());
			});

		emit(setHostRunning(true));

		const name = serverName ?? TCP_SERVER_NAME;

		zeroconf.publishService(TCP_SERVICE_NAME, "tcp", "local.", name, TCP_PORT);

		return () => {
			clearTCPServerInstance();
			clearTCPClientSockets();
		};
	});
};
