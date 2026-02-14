import { seconds } from "@shared/lib";
import TcpSocket from "react-native-tcp-socket";
import {
	TCP_HOST,
	TCP_PORT,
	TCP_SERVER_WATCHDOG_PING,
} from "../../../../../shared/config";

/**
 * Connects to TCP_HOST:TCP_PORT, sends TCP_SERVER_WATCHDOG_PING.
 * Resolves true if connect + write succeed, false otherwise.
 */
export function checkTCPServerAlive(): Promise<boolean> {
	return new Promise((resolve) => {
		let done = false;
		const finish = (ok: boolean) => {
			if (done) {
				return;
			}
			done = true;
			socket.destroy();
			resolve(ok);
		};
		const socket = TcpSocket.createConnection(
			{
				host: TCP_HOST,
				port: TCP_PORT,
				connectTimeout: seconds(2),
			},
			() => {
				socket.write(`${TCP_SERVER_WATCHDOG_PING}\n`, "utf8", (err?: Error) => {
					finish(!err);
				});
			},
		);
		socket.on("error", () => finish(false));
		socket.on("close", () => finish(false));
	});
}
