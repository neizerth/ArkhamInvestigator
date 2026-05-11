import { log } from "@modules/core/log/shared/config";
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
		const conn = { established: false };
		const watchdog = {
			id: undefined as ReturnType<typeof setTimeout> | undefined,
		};

		const socket = TcpSocket.createConnection(
			{
				host,
				port: TCP_PORT,
				connectTimeout: seconds(8),
			},
			() => {},
		);

		const finish = (ok: boolean) => {
			if (settled) {
				return;
			}
			settled = true;
			if (watchdog.id !== undefined) {
				clearTimeout(watchdog.id);
			}
			try {
				socket.destroy();
			} catch {
				/* ignore */
			}
			resolve(ok);
		};

		socket.once("connect", () => {
			conn.established = true;
			finish(true);
		});
		socket.once("error", (err: unknown) => {
			const message = err instanceof Error ? err.message : String(err);
			log.warn("tcp host reachability failed", {
				host,
				port: TCP_PORT,
				message,
			});
			finish(false);
		});
		/** RN may emit `close` during teardown; ignore after a successful `connect`. */
		socket.once("close", () => {
			if (!conn.established) {
				finish(false);
			}
		});

		watchdog.id = setTimeout(() => finish(false), seconds(10));
	});
}
