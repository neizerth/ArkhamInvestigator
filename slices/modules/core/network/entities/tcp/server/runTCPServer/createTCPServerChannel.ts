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
	setHostRunning,
	tcpServerClosed,
	tcpServerError,
	tcpServerSocketClosed,
	tcpServerSocketConnected,
	tcpServerSocketDataReceived,
	tcpServerSocketError,
} from "../../../../shared/lib";

export type TCPServerChannelAction =
	| ReturnType<typeof tcpServerSocketDataReceived>
	| ReturnType<typeof tcpServerSocketClosed>
	| ReturnType<typeof tcpServerSocketConnected>
	| ReturnType<typeof tcpServerSocketError>;

export const createTCPServerChannel = (serverName: string | null) => {
	return eventChannel((emit) => {
		const zeroconf = new Zeroconf();

		clearTCPClientSockets();

		const server = TcpSocket.createServer((socket) => {
			socket.on("error", (error) => {
				emit(
					tcpServerSocketError({
						socket,
						error,
					}),
				);
			});
			socket.on("connect", () => {
				emit(
					tcpServerSocketConnected({
						socket,
					}),
				);
			});
			socket.on("close", () => {
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

		server.listen({
			port: TCP_PORT,
			host: TCP_HOST,
		});

		server
			.on("error", (error) => {
				emit(
					tcpServerError({
						error,
					}),
				);
			})
			.on("close", () => {
				emit(setHostRunning(false));
				emit(tcpServerClosed());
			});

		emit(setHostRunning(true));

		const name = serverName ?? TCP_SERVER_NAME;

		zeroconf.publishService(TCP_SERVICE_NAME, "tcp", "local.", name, TCP_PORT);

		return () => {
			server.close();
		};
	});
};
