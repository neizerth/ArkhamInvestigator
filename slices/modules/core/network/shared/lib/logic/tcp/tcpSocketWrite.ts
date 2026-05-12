import type TcpSocket from "react-native-tcp-socket";

/** UTF-8 write that surfaces native/write errors via the promise (see `Socket.write` optional callback). */
export function tcpSocketWrite(
	socket: TcpSocket.Socket,
	data: string,
): Promise<void> {
	if (socket.destroyed) {
		return Promise.reject(new Error("Socket destroyed"));
	}
	return new Promise((resolve, reject) => {
		try {
			socket.write(data, "utf8", (err?: Error) => {
				if (err) {
					reject(err);
					return;
				}
				resolve();
			});
		} catch (error) {
			reject(error);
		}
	});
}
