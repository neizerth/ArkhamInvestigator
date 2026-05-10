import { seconds } from "@shared/lib";
import TcpSocket from "react-native-tcp-socket";
import { TCP_PORT } from "../../../config";

/**
 * True if a TCP connection to host:port succeeds (then closes).
 * Used to ignore stale Bonjour entries that no longer accept game traffic.
 */
export function checkTcpHostReachable(host: string): Promise<boolean> {
	return new Promise((resolve) => {
		let settled = false;
		const finish = (ok: boolean) => {
			if (settled) {
				return;
			}
			settled = true;
			try {
				socket.destroy();
			} catch {
				/* ignore */
			}
			resolve(ok);
		};

		const socket = TcpSocket.createConnection(
			{
				host,
				port: TCP_PORT,
				connectTimeout: seconds(2),
			},
			() => {
				finish(true);
			},
		);

		socket.on("error", () => finish(false));
	});
}
