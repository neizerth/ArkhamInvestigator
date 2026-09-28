import {
	network,
	selectHostIP,
	setHostIP,
	tcpClientSocketConnected,
	tcpClientSocketError,
} from "@modules/core/network/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { game, selectGameStatus } from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { setHostInviteCode } from "../setHostInviteCode";
import { setHostInviteCodeSaga } from "../setHostInviteCodeSaga";

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
});

// DVDDDGDG decodes to 10.0.2.2 per the app's own codeAlphabet
const VALID_CODE = "DVDDDGDG";

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.useRealTimers();
});

describe("setHostInviteCodeSaga", () => {
	it("decodes the code, sets hostIP, and marks the game 'initial' immediately", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(setHostInviteCodeSaga);

		tester.dispatch(setHostInviteCode(VALID_CODE));
		await Promise.resolve();

		expect(selectHostIP(tester.getState())).toBe("10.0.2.2");
		expect(selectGameStatus(tester.getState())).toBe("initial");
	});

	it("resolves cleanly on tcpClientSocketConnected, without an error toast or resetting hostIP", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(setHostInviteCodeSaga);

		tester.dispatch(setHostInviteCode(VALID_CODE));
		await Promise.resolve();
		tester.dispatch(tcpClientSocketConnected());
		await Promise.resolve();

		expect(selectHostIP(tester.getState())).toBe("10.0.2.2");
		expect(tester.ofType(sendNotification.type)).toHaveLength(0);
	});

	it("resets hostIP and toasts an error on tcpClientSocketError", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(setHostInviteCodeSaga);

		tester.dispatch(setHostInviteCode(VALID_CODE));
		await Promise.resolve();
		tester.dispatch(
			tcpClientSocketError({ error: new Error("connect failed") }),
		);
		await Promise.resolve();

		expect(selectHostIP(tester.getState())).toBeNull();
		expect(tester.ofType(sendNotification.type)).toHaveLength(1);
	});

	it("resets hostIP and toasts an error after the 10s connect timeout with no response", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(setHostInviteCodeSaga);

		tester.dispatch(setHostInviteCode(VALID_CODE));
		await Promise.resolve();

		await jest.advanceTimersByTimeAsync(10_000);
		await Promise.resolve();

		expect(selectHostIP(tester.getState())).toBeNull();
		expect(tester.ofType(sendNotification.type)).toHaveLength(1);
	});

	it("rejects a malformed code without touching hostIP or gameStatus", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(setHostInviteCodeSaga);

		tester.dispatch(setHostInviteCode("not-a-real-code"));
		await Promise.resolve();

		expect(selectHostIP(tester.getState())).toBeNull();
		expect(tester.ofType(sendNotification.type)).toHaveLength(1);
		expect(tester.ofType(setHostIP.type)).toHaveLength(0);
	});
});
