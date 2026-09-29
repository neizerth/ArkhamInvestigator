import { restartTCPClient } from "@modules/core/network/entities/lib/store/features/tcp/client/restartTCPClient";
import {
	startTCPClient,
	stopTCPClient,
} from "@modules/core/network/shared/lib/store/actions/tcp/tcpClient";
import {
	network,
	setHostIP,
} from "@modules/core/network/shared/lib/store/network";
import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { useFreshFakeClock } from "@shared/lib/test/useFreshFakeClock";
import { restartTCPClientSaga } from "../restartTCPClientSaga";

const reducer = combineReducers({ network: network.reducer });

const setup = ({ hostIP }: { hostIP?: string } = {}) => {
	const state = hostIP
		? reducer(reducer(undefined, { type: "@@init" }), setHostIP(hostIP))
		: undefined;
	const tester = createSagaTester({ reducer, state });
	tester.run(restartTCPClientSaga);

	return {
		tester,
		restart: async () => {
			tester.dispatch(restartTCPClient());
			await jest.advanceTimersByTimeAsync(100);
		},
		stops: () => tester.ofType(stopTCPClient.type).length,
		starts: () =>
			tester.ofType(startTCPClient.type) as ReturnType<typeof startTCPClient>[],
	};
};

// the saga throttles restarts with a module-level `lastRestartTime`
useFreshFakeClock();

describe("restartTCPClientSaga", () => {
	it("stops and restarts the client with the current hostIP", async () => {
		const { restart, stops, starts } = setup({ hostIP: "192.168.1.20" });

		await restart();

		expect(stops()).toBe(1);
		expect(starts()).toHaveLength(1);
		expect(starts()[0].payload).toEqual({ host: "192.168.1.20" });
	});

	it("does nothing when hostIP is not set", async () => {
		const { restart, stops, starts } = setup();

		await restart();

		expect(stops()).toBe(0);
		expect(starts()).toHaveLength(0);
	});

	it("throttles a second restart within 5s of the first", async () => {
		const { restart, stops } = setup({ hostIP: "192.168.1.20" });

		await restart();
		await restart();

		expect(stops()).toBe(1);
	});

	it("allows a restart again once the throttle window has passed", async () => {
		const { restart, stops } = setup({ hostIP: "192.168.1.20" });

		await restart();
		await jest.advanceTimersByTimeAsync(5_000);
		await restart();

		expect(stops()).toBe(2);
	});
});
