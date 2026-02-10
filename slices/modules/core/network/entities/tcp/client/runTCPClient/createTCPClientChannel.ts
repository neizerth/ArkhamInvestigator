import TcpSocket from "react-native-tcp-socket";
import { eventChannel } from "redux-saga";
import { TCP_PORT } from "../../../../shared/config";
import {
	clearTCPServerSocket,
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
	| ReturnType<typeof tcpClientSocketError>;

export const createTCPClientChannel = (host: string) => {
	return eventChannel((emit) => {
		clearTCPServerSocket();

		const options = {
			host,
			port: TCP_PORT,
		};

		const socket = TcpSocket.createConnection(options, () => {
			console.log("tcp client socket created");
		});

		setTCPServerSocket(socket);

		socket.on("connect", () => {
			console.log("tcp client connected");
			emit(tcpClientSocketConnected());
		});

		socket.on("error", (error) => {
			console.log("tcp client error", error);
			emit(tcpClientSocketError({ error }));
		});
		socket.on("close", () => {
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
			socket.destroy();
		};
	});
};
