import { EventEmitter } from "node:events";
import {
	getTCPServerInstance,
	setTCPServerInstance,
	startTCPServerZeroconf,
	tcpServerClosed,
	tcpServerError,
	tcpServerListening,
	tcpServerSocketClosed,
	tcpServerSocketConnected,
	tcpServerSocketDataReceived,
	tcpServerSocketError,
} from "@modules/core/network/shared/lib";
import { runSaga, stdChannel } from "redux-saga";
import { take } from "redux-saga/effects";
import { createTCPServerChannel } from "../createTCPServerChannel";

class FakeServer extends EventEmitter {
	onConnection?: (socket: FakeClientSocket) => void;
	listen = jest.fn();
	close = jest.fn((cb?: () => void) => {
		cb?.();
	});
	address = jest.fn(() => ({ port: 4242 }));
}

class FakeClientSocket extends EventEmitter {
	remoteAddress = "10.0.0.2";
}

let fakeServer: FakeServer;
const mockCreateServer = jest.fn();
jest.mock("react-native-tcp-socket", () => ({
	__esModule: true,
	default: {
		createServer: (...args: unknown[]) => mockCreateServer(...args),
	},
}));

const collectAll = (channel: ReturnType<typeof createTCPServerChannel>) => {
	const collected: unknown[] = [];
	function* saga() {
		try {
			while (true) {
				collected.push(yield take(channel));
			}
		} catch {
			// closed
		}
	}
	runSaga(
		{ channel: stdChannel(), dispatch: jest.fn(), getState: () => ({}) },
		saga,
	);
	return collected;
};

beforeEach(() => {
	jest.useFakeTimers();
	fakeServer = new FakeServer();
	mockCreateServer.mockReset().mockImplementation((onConnection) => {
		fakeServer.onConnection = onConnection;
		return fakeServer;
	});
	setTCPServerInstance(null);
});

afterEach(() => {
	jest.useRealTimers();
});

describe("createTCPServerChannel", () => {
	it("starts listening and emits tcpServerListening + startTCPServerZeroconf", async () => {
		const channel = createTCPServerChannel("Roland");
		const collected = collectAll(channel);

		fakeServer.emit("listening");
		await Promise.resolve();

		expect(fakeServer.listen).toHaveBeenCalled();
		expect(collected).toEqual([tcpServerListening(), startTCPServerZeroconf()]);
	});

	it("forwards per-connection socket events (connect/data/close/error)", async () => {
		const channel = createTCPServerChannel("Roland");
		const collected = collectAll(channel);

		const clientSocket = new FakeClientSocket();
		fakeServer.onConnection?.(clientSocket);

		clientSocket.emit("connect");
		clientSocket.emit("data", Buffer.from('{"hello":1}\n'));
		clientSocket.emit("close");
		const error = new Error("boom");
		clientSocket.emit("error", error);
		await Promise.resolve();

		expect(collected).toEqual([
			tcpServerSocketConnected({ socket: clientSocket as never }),
			tcpServerSocketDataReceived({
				socket: clientSocket as never,
				data: '{"hello":1}',
			}),
			tcpServerSocketClosed({ socket: clientSocket as never }),
			tcpServerSocketError({ socket: clientSocket as never, error }),
		]);
	});

	it("emits tcpServerClosed on a normal close (not a bind retry, not cancelled)", async () => {
		const channel = createTCPServerChannel("Roland");
		const collected = collectAll(channel);

		fakeServer.emit("close");
		await Promise.resolve();

		expect(collected).toEqual([tcpServerClosed()]);
	});

	it("does not emit tcpServerClosed after the channel has been unsubscribed (cancelled)", async () => {
		const channel = createTCPServerChannel("Roland");
		const collected = collectAll(channel);

		channel.close();
		fakeServer.emit("close");
		await Promise.resolve();

		expect(collected).toEqual([]);
	});

	it("retries binding on EADDRINUSE without emitting tcpServerClosed or tcpServerError", async () => {
		const channel = createTCPServerChannel("Roland");
		const collected = collectAll(channel);
		const firstServer = fakeServer;

		const secondServer = new FakeServer();
		mockCreateServer.mockImplementationOnce((onConnection) => {
			secondServer.onConnection = onConnection;
			return secondServer;
		});

		firstServer.emit("error", new Error("EADDRINUSE"));
		// the retry close() call should be tagged so its subsequent 'close' does not
		// look like a real shutdown
		firstServer.emit("close");

		await jest.advanceTimersByTimeAsync(200);

		expect(firstServer.close).toHaveBeenCalled();
		expect(mockCreateServer).toHaveBeenCalledTimes(2);
		// neither the retry's close() nor the bind error itself should reach the store
		expect(collected).toEqual([]);
	});

	it("gives up after maxBindRetries and surfaces the error instead of retrying forever", async () => {
		const channel = createTCPServerChannel("Roland");
		const collected = collectAll(channel);
		let current = fakeServer;

		// drive 10 consecutive EADDRINUSE retries, exhausting maxBindRetries (10)
		for (let i = 0; i < 10; i++) {
			const next = new FakeServer();
			mockCreateServer.mockImplementationOnce((onConnection) => {
				next.onConnection = onConnection;
				return next;
			});
			current.emit("error", new Error("EADDRINUSE"));
			current.emit("close");
			await jest.advanceTimersByTimeAsync(2000);
			current = next;
		}

		// the 11th EADDRINUSE should now be surfaced instead of retried again
		current.emit("error", new Error("EADDRINUSE"));
		await Promise.resolve();

		expect(collected).toEqual([
			tcpServerError({ error: expect.any(Error) as never }),
		]);
	});

	it("surfaces a non-EADDRINUSE error immediately via tcpServerError", async () => {
		const channel = createTCPServerChannel("Roland");
		const collected = collectAll(channel);

		const error = new Error("something else");
		fakeServer.emit("error", error);
		await Promise.resolve();

		expect(collected).toEqual([tcpServerError({ error: error as never })]);
	});

	it("clears a stale previous server instance and waits for its close before starting a new one", async () => {
		const prevServer = new FakeServer();
		setTCPServerInstance(prevServer as never);

		const channel = createTCPServerChannel("Roland");
		void channel;

		// the new server is only created inside prevServer's close() callback
		expect(prevServer.close).toHaveBeenCalled();
		expect(mockCreateServer).toHaveBeenCalledTimes(1);
	});

	it("on unsubscribe: clears the server instance so a future create doesn't see a stale one", () => {
		const channel = createTCPServerChannel("Roland");
		fakeServer.emit("listening");

		channel.close();

		expect(getTCPServerInstance()).toBeNull();
	});
});
