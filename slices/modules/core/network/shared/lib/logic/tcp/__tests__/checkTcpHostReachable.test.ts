import { EventEmitter } from "node:events";
import { checkTcpHostReachable } from "../checkTcpHostReachable";

class FakeSocket extends EventEmitter {
	destroy = jest.fn();
}

const mockCreateConnection = jest.fn();
jest.mock("react-native-tcp-socket", () => ({
	__esModule: true,
	default: {
		createConnection: (...args: unknown[]) => mockCreateConnection(...args),
	},
}));

describe("checkTcpHostReachable", () => {
	let fakeSocket: FakeSocket;

	beforeEach(() => {
		jest.useFakeTimers();
		fakeSocket = new FakeSocket();
		mockCreateConnection.mockReset().mockReturnValue(fakeSocket);
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("resolves true when the socket connects", async () => {
		const promise = checkTcpHostReachable("10.0.0.5");
		fakeSocket.emit("connect");
		await expect(promise).resolves.toBe(true);
		expect(fakeSocket.destroy).toHaveBeenCalled();
	});

	it("resolves false on socket error", async () => {
		const promise = checkTcpHostReachable("10.0.0.5");
		fakeSocket.emit("error", new Error("refused"));
		await expect(promise).resolves.toBe(false);
	});

	it("resolves false on close before a successful connect", async () => {
		const promise = checkTcpHostReachable("10.0.0.5");
		fakeSocket.emit("close");
		await expect(promise).resolves.toBe(false);
	});

	it("ignores a close event that arrives after a successful connect", async () => {
		const promise = checkTcpHostReachable("10.0.0.5");
		fakeSocket.emit("connect");
		fakeSocket.emit("close");
		await expect(promise).resolves.toBe(true);
	});

	it("resolves false via the watchdog timeout when nothing happens", async () => {
		const promise = checkTcpHostReachable("10.0.0.5");
		jest.advanceTimersByTime(10_000);
		await expect(promise).resolves.toBe(false);
	});

	it("only settles once even if multiple terminal events fire", async () => {
		const promise = checkTcpHostReachable("10.0.0.5");
		fakeSocket.emit("connect");
		fakeSocket.emit("error", new Error("late"));
		await expect(promise).resolves.toBe(true);
		expect(fakeSocket.destroy).toHaveBeenCalledTimes(1);
	});
});
