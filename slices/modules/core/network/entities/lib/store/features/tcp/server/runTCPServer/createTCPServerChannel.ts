import { log } from "@modules/core/log/shared/config";
import TcpSocket from "react-native-tcp-socket";
import Zeroconf from "react-native-zeroconf";
import { eventChannel } from "redux-saga";
import {
	TCP_HOST,
	TCP_PORT,
	TCP_SERVER_NAME,
	TCP_SERVER_WATCHDOG_PING,
	TCP_SERVICE_NAME,
} from "../../../../../../../shared/config";
import {
	clearTCPClientSockets,
	clearTCPServerInstance,
	getTCPServerInstance,
	setHostRunning,
	setTCPServerInstance,
	tcpServerClosed,
	tcpServerError,
	tcpServerListening,
	tcpServerSocketClosed,
	tcpServerSocketConnected,
	tcpServerSocketDataReceived,
	tcpServerSocketError,
} from "../../../../../../../shared/lib";

export type TCPServerChannelAction =
	| ReturnType<typeof tcpServerSocketDataReceived>
	| ReturnType<typeof tcpServerSocketClosed>
	| ReturnType<typeof tcpServerSocketConnected>
	| ReturnType<typeof tcpServerSocketError>
	| ReturnType<typeof tcpServerListening>
	| ReturnType<typeof tcpServerClosed>;

export const createTCPServerChannel = (serverName: string | null) => {
	return eventChannel((emit) => {
		let cancelled = false;
		let bindRetries = 0;
		const maxBindRetries = 10;

		const prev = getTCPServerInstance();
		if (prev) {
			setTCPServerInstance(null);
		}
		clearTCPClientSockets();
		const zeroconf = new Zeroconf();

		let server: TcpSocket.Server | null = null;

		const start = () => {
			if (cancelled) return;

			server = TcpSocket.createServer((socket) => {
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
					const raw = data.toString();
					if (raw.trim() === TCP_SERVER_WATCHDOG_PING) {
						return;
					}
					emit(
						tcpServerSocketDataReceived({
							socket,
							data: raw,
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
					bindRetries = 0;
					log.info("tcp server: listening", server?.address());
					emit(tcpServerListening());
				})
				.on("error", (error) => {
					const message =
						error instanceof Error ? error.message : String(error ?? "");

					// Under Fast Refresh/HMR the previous native server may keep the port
					// for a short time even after `close()`. Retry with backoff to avoid
					// crashing the app and spamming restart loops.
					if (
						message.includes("EADDRINUSE") &&
						bindRetries < maxBindRetries &&
						!cancelled
					) {
						bindRetries++;
						const delayMs = Math.min(2000, 150 * bindRetries);
						log.warn(
							"tcp server bind in use, retrying",
							`(${bindRetries}/${maxBindRetries})`,
							`${delayMs}ms`,
						);
						try {
							server?.close();
						} catch {
							// ignore
						}
						setTCPServerInstance(null);
						setTimeout(() => start(), delayMs);
						return;
					}

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
			zeroconf.publishService(
				TCP_SERVICE_NAME,
				"tcp",
				"local.",
				name,
				TCP_PORT,
			);
		};

		// If we closed a previous server, wait for its close callback before starting.
		// This is more reliable than a fixed timeout under Fast Refresh/HMR.
		if (prev) {
			prev.close(() => {
				if (cancelled) return;
				start();
			});
		} else {
			start();
		}

		return () => {
			cancelled = true;
			clearTCPServerInstance();
			clearTCPClientSockets();
		};
	});
};
