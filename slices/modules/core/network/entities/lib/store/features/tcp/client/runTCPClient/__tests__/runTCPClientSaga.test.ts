import {
	startTCPClient,
	stopTCPClient,
	tcpClientSocketClosed,
	tcpClientSocketConnected,
} from "@modules/core/network/shared/lib";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { eventChannel } from "redux-saga";
import { runTCPClientSaga } from "../runTCPClientSaga";

let emitFromChannel: ((action: unknown) => void) | null = null;
let closeSpy: jest.Mock;
const mockCreateTCPClientChannel = jest.fn();
jest.mock("../createTCPClientChannel", () => ({
	createTCPClientChannel: (...args: unknown[]) =>
		mockCreateTCPClientChannel(...args),
}));

const makeControllableChannel = () => {
	closeSpy = jest.fn();
	return eventChannel((emit) => {
		emitFromChannel = emit as (action: unknown) => void;
		return () => {
			closeSpy();
		};
	});
};

beforeEach(() => {
	emitFromChannel = null;
	mockCreateTCPClientChannel
		.mockReset()
		.mockImplementation(makeControllableChannel);
});

describe("runTCPClientSaga", () => {
	it("creates a channel with the given host and forwards events", async () => {
		const tester = createSagaTester();
		tester.run(runTCPClientSaga);

		tester.dispatch(startTCPClient({ host: "10.0.0.9" }));
		await Promise.resolve();
		await Promise.resolve();

		expect(mockCreateTCPClientChannel).toHaveBeenCalledWith("10.0.0.9");

		emitFromChannel?.(tcpClientSocketConnected());
		await Promise.resolve();
		await Promise.resolve();

		expect(tester.ofType(tcpClientSocketConnected.type)).toHaveLength(1);
	});

	it("ends the worker (without forcing a channel close) when tcpClientSocketClosed arrives", async () => {
		const tester = createSagaTester();
		tester.run(runTCPClientSaga);

		tester.dispatch(startTCPClient({ host: "10.0.0.9" }));
		await Promise.resolve();
		await Promise.resolve();

		emitFromChannel?.(tcpClientSocketClosed());
		await Promise.resolve();
		await Promise.resolve();

		expect(tester.ofType(tcpClientSocketClosed.type)).toHaveLength(1);
		// worker returned naturally (socket already closed itself) -> finally sees cancelled=false,
		// so it must NOT call channel.close() again
		expect(closeSpy).not.toHaveBeenCalled();
	});

	it("closes the channel when cancelled via stopTCPClient", async () => {
		const tester = createSagaTester();
		tester.run(runTCPClientSaga);

		tester.dispatch(startTCPClient({ host: "10.0.0.9" }));
		await Promise.resolve();
		await Promise.resolve();

		tester.dispatch(stopTCPClient());
		await Promise.resolve();
		await Promise.resolve();

		expect(closeSpy).toHaveBeenCalled();
	});

	it("takeLatest cancels a still-running worker when a new startTCPClient arrives", async () => {
		const tester = createSagaTester();
		tester.run(runTCPClientSaga);

		tester.dispatch(startTCPClient({ host: "host-a" }));
		await Promise.resolve();
		await Promise.resolve();
		const firstClose = closeSpy;

		tester.dispatch(startTCPClient({ host: "host-b" }));
		await Promise.resolve();
		await Promise.resolve();

		expect(mockCreateTCPClientChannel).toHaveBeenNthCalledWith(1, "host-a");
		expect(mockCreateTCPClientChannel).toHaveBeenNthCalledWith(2, "host-b");
		expect(firstClose).toHaveBeenCalled();
	});
});
