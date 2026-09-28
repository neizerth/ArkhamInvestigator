import {
	network,
	selectHostIP,
	setHostIP,
} from "@modules/core/network/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { game, selectGameStatus } from "@modules/game/shared/lib";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { setZeroconfService } from "../setZeroconfService";
import { setZeroconfServiceSaga } from "../setZeroconfServiceSaga";

const mockCheckTcpHostReachable = jest.fn();
jest.mock("@modules/core/network/shared/lib", () => {
	const actual = jest.requireActual("@modules/core/network/shared/lib");
	return {
		...actual,
		checkTcpHostReachable: (ip: string) => mockCheckTcpHostReachable(ip),
	};
});
jest.mock("@modules/core/log/shared/config", () => ({
	tcpLog: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

const reducer = combineReducers({
	network: network.reducer,
	game: game.reducer,
});

beforeEach(() => {
	mockCheckTcpHostReachable.mockReset();
});

const buildService = (addresses: string[]) =>
	({ name: "ArkhamHost", addresses }) as never;

describe("setZeroconfServiceSaga", () => {
	it("adopts the first reachable address, checking in reverse order", async () => {
		mockCheckTcpHostReachable.mockImplementation((ip: string) =>
			Promise.resolve(ip === "10.0.0.2"),
		);
		const tester = createSagaTester({ reducer });
		tester.run(setZeroconfServiceSaga);

		tester.dispatch(setZeroconfService(buildService(["10.0.0.1", "10.0.0.2"])));
		await Promise.resolve();
		await Promise.resolve();
		await Promise.resolve();

		// addresses are checked reversed: "10.0.0.2" first, found reachable -> adopted, "10.0.0.1"
		// never even gets checked
		expect(selectHostIP(tester.getState())).toBe("10.0.0.2");
		expect(selectGameStatus(tester.getState())).toBe("initial");
		expect(mockCheckTcpHostReachable).toHaveBeenCalledTimes(1);
		expect(mockCheckTcpHostReachable).toHaveBeenCalledWith("10.0.0.2");
	});

	it("falls through to the next address when the first (reversed) one is unreachable", async () => {
		mockCheckTcpHostReachable.mockImplementation((ip: string) =>
			Promise.resolve(ip === "10.0.0.1"),
		);
		const tester = createSagaTester({ reducer });
		tester.run(setZeroconfServiceSaga);

		tester.dispatch(setZeroconfService(buildService(["10.0.0.1", "10.0.0.2"])));
		await Promise.resolve();
		await Promise.resolve();
		await Promise.resolve();
		await Promise.resolve();

		expect(selectHostIP(tester.getState())).toBe("10.0.0.1");
		expect(mockCheckTcpHostReachable).toHaveBeenCalledTimes(2);
	});

	it("notifies an error when no address is reachable", async () => {
		mockCheckTcpHostReachable.mockResolvedValue(false);
		let state = reducer(undefined, { type: "@@init" });
		state = reducer(state, setHostIP("192.168.1.99")); // pre-existing, should be untouched
		const tester = createSagaTester({ reducer, state });
		tester.run(setZeroconfServiceSaga);

		tester.dispatch(setZeroconfService(buildService(["10.0.0.1", "10.0.0.2"])));
		await Promise.resolve();
		await Promise.resolve();
		await Promise.resolve();
		await Promise.resolve();

		expect(tester.ofType(sendNotification.type)).toHaveLength(1);
		expect(selectHostIP(tester.getState())).toBe("192.168.1.99"); // untouched
	});

	it("notifies an error immediately for a service with no addresses at all", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(setZeroconfServiceSaga);

		tester.dispatch(setZeroconfService(buildService([])));
		await Promise.resolve();

		expect(mockCheckTcpHostReachable).not.toHaveBeenCalled();
		// no addresses at all: the saga just logs and returns, no error toast either
		expect(tester.ofType(sendNotification.type)).toHaveLength(0);
	});
});
