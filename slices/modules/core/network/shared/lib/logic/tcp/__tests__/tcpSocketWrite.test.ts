import type TcpSocket from "react-native-tcp-socket";
import { tcpSocketWrite } from "../tcpSocketWrite";

const makeSocket = (overrides: Partial<TcpSocket.Socket> = {}) =>
	({
		destroyed: false,
		write: jest.fn(),
		...overrides,
	}) as unknown as TcpSocket.Socket;

describe("tcpSocketWrite", () => {
	it("rejects immediately without calling write when the socket is destroyed", async () => {
		const write = jest.fn();
		const socket = makeSocket({ destroyed: true, write });

		await expect(tcpSocketWrite(socket, "data")).rejects.toThrow(
			"Socket destroyed",
		);
		expect(write).not.toHaveBeenCalled();
	});

	it("resolves when the write callback reports no error", async () => {
		const write = jest.fn(
			(_data: string, _enc: string, cb: (err?: Error) => void) => cb(),
		);
		const socket = makeSocket({ write: write as never });

		await expect(tcpSocketWrite(socket, "hello")).resolves.toBeUndefined();
		expect(write).toHaveBeenCalledWith("hello", "utf8", expect.any(Function));
	});

	it("rejects when the write callback reports an error", async () => {
		const error = new Error("boom");
		const write = jest.fn(
			(_data: string, _enc: string, cb: (err?: Error) => void) => cb(error),
		);
		const socket = makeSocket({ write: write as never });

		await expect(tcpSocketWrite(socket, "hello")).rejects.toBe(error);
	});

	it("rejects when the synchronous write call throws", async () => {
		const error = new Error("sync boom");
		const write = jest.fn(() => {
			throw error;
		});
		const socket = makeSocket({ write: write as never });

		await expect(tcpSocketWrite(socket, "hello")).rejects.toBe(error);
	});
});
