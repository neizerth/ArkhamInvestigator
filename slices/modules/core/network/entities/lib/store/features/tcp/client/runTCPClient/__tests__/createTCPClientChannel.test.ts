import { EventEmitter } from "node:events";
import {
	clearTCPServerSocket,
	getTCPServerSocket,
	setClientRunning,
	tcpClientSocketClosed,
	tcpClientSocketConnected,
	tcpClientSocketDataReceived,
	tcpClientSocketError,
} from "@modules/core/network/shared/lib";
import { runSaga, stdChannel } from "redux-saga";
import { take } from "redux-saga/effects";
import { createTCPClientChannel } from "../createTCPClientChannel";

class FakeSocket extends EventEmitter {
	destroy = jest.fn();
	address = jest.fn(() => ({ port: 1234 }));
}

let fakeSocket: FakeSocket;
const mockCreateConnection = jest.fn();
jest.mock("react-native-tcp-socket", () => ({
	__esModule: true,
	default: {
		createConnection: (...args: unknown[]) => mockCreateConnection(...args),
	},
}));

/** Collects every action taken off the channel until it's closed. */
const collectAll = (channel: ReturnType<typeof createTCPClientChannel>) => {
	const collected: unknown[] = [];
	function* saga() {
		try {
			while (true) {
				collected.push(yield take(channel));
			}
		} catch {
			// channel closed
		}
	}
	runSaga(
		{ channel: stdChannel(), dispatch: jest.fn(), getState: () => ({}) },
		saga,
	);
	return collected;
};

beforeEach(() => {
	fakeSocket = new FakeSocket();
	mockCreateConnection.mockReset().mockImplementation((_opts, cb) => {
		const socket = fakeSocket;
		// real TcpSocket.createConnection invokes the callback asynchronously (once actually
		// connected); calling it synchronously here would reference `socket` before the
		// `const socket = createConnection(...)` assignment completes in the source.
		queueMicrotask(() => cb?.());
		return socket;
	});
	clearTCPServerSocket();
});

describe("createTCPClientChannel", () => {
	it("clears any previous server socket before connecting", () => {
		createTCPClientChannel("10.0.0.1");
		expect(mockCreateConnection).toHaveBeenCalledWith(
			expect.objectContaining({ host: "10.0.0.1" }),
			expect.any(Function),
		);
	});

	it("emits setClientRunning(true) then tcpClientSocketConnected on connect", async () => {
		const channel = createTCPClientChannel("10.0.0.1");
		const collected = collectAll(channel);
		fakeSocket.emit("connect");
		await Promise.resolve();

		expect(collected).toEqual([
			setClientRunning(true),
			tcpClientSocketConnected(),
		]);
	});

	it("emits tcpClientSocketError on socket error", async () => {
		const channel = createTCPClientChannel("10.0.0.1");
		const collected = collectAll(channel);
		const error = new Error("refused");
		fakeSocket.emit("error", error);
		await Promise.resolve();

		expect(collected).toEqual([tcpClientSocketError({ error })]);
	});

	it("emits setClientRunning(false) and tcpClientSocketClosed on close, when this socket is still active", async () => {
		const channel = createTCPClientChannel("10.0.0.1");
		const collected = collectAll(channel);
		expect(getTCPServerSocket()).toBe(fakeSocket);

		fakeSocket.emit("close");
		await Promise.resolve();

		expect(collected).toEqual([
			setClientRunning(false),
			tcpClientSocketClosed(),
		]);
	});

	it("parses newline-delimited JSON payloads from data events", async () => {
		const channel = createTCPClientChannel("10.0.0.1");
		const collected = collectAll(channel);
		fakeSocket.emit("data", Buffer.from('{"a":1}\n'));
		await Promise.resolve();

		expect(collected).toEqual([
			tcpClientSocketDataReceived({ data: '{"a":1}' }),
		]);
	});

	it("ignores a close event for a stale socket that is no longer the active one (takeover reconnect)", async () => {
		const channel = createTCPClientChannel("10.0.0.1");
		const collected = collectAll(channel);
		const staleSocket = fakeSocket;

		// a second connect takes over as the active socket
		fakeSocket = new FakeSocket();
		mockCreateConnection.mockImplementation((_opts, cb) => {
			queueMicrotask(() => cb?.());
			return fakeSocket;
		});
		createTCPClientChannel("10.0.0.2");

		staleSocket.emit("close");
		await Promise.resolve();

		expect(collected).toEqual([]);
	});

	it("on unsubscribe: destroys the socket and, if still active, emits setClientRunning(false) and clears the shared socket", () => {
		const channel = createTCPClientChannel("10.0.0.1");
		expect(getTCPServerSocket()).toBe(fakeSocket);

		channel.close();

		expect(fakeSocket.destroy).toHaveBeenCalled();
		expect(getTCPServerSocket()).toBeNull();
	});

	it("on unsubscribe for a socket that's already been superseded, does not clear the newer socket", () => {
		const channel = createTCPClientChannel("10.0.0.1");
		const otherSocket = new FakeSocket();
		mockCreateConnection.mockImplementation((_opts, cb) => {
			queueMicrotask(() => cb?.());
			return otherSocket;
		});
		createTCPClientChannel("10.0.0.2");
		expect(getTCPServerSocket()).toBe(otherSocket);

		channel.close();

		expect(getTCPServerSocket()).toBe(otherSocket);
	});
});
