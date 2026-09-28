import { addEventListener } from "@react-native-community/netinfo";
import { runSaga, stdChannel } from "redux-saga";
import { take } from "redux-saga/effects";
import { networkInfoUpdated } from "../../../shared/lib";
import { networkChannel } from "../networkChannel";

const mockAddEventListener = addEventListener as jest.Mock;

describe("networkChannel", () => {
	it("emits networkInfoUpdated whenever NetInfo reports a new state", async () => {
		let listener: ((state: unknown) => void) | undefined;
		const unsubscribe = jest.fn();
		mockAddEventListener.mockImplementation((cb) => {
			listener = cb;
			return unsubscribe;
		});

		const received: unknown[] = [];
		function* saga() {
			const channel = networkChannel();
			received.push(yield take(channel));
		}

		runSaga(
			{ channel: stdChannel(), dispatch: jest.fn(), getState: () => ({}) },
			saga,
		);

		await Promise.resolve();
		listener?.({ type: "wifi", isConnected: true });
		await Promise.resolve();
		await Promise.resolve();

		expect(received).toHaveLength(1);
		expect((received[0] as ReturnType<typeof networkInfoUpdated>).type).toBe(
			networkInfoUpdated.type,
		);
	});

	it("unsubscribes from NetInfo when the channel is closed", () => {
		const unsubscribe = jest.fn();
		mockAddEventListener.mockReturnValue(unsubscribe);

		const channel = networkChannel();
		channel.close();

		expect(unsubscribe).toHaveBeenCalled();
	});
});
