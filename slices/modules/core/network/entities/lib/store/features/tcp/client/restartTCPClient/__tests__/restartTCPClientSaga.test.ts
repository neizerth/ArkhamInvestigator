import { combineReducers } from "@reduxjs/toolkit";
import { createSagaTester } from "@shared/lib/test/createSagaTester";

jest.mock("@shared/lib", () =>
	require("@shared/lib/test/mocks").sharedLibMock(),
);
// Avoid pulling in the full `@modules/core/network/shared/lib` index (its selectors barrel
// drags in `@shared/config/device`, which reads `Platform.Version` on load and breaks under
// `jest.isolateModules` below, since the isolated registry re-requires `react-native` fresh
// without jest.setup's `Platform.Version` patch applied to that instance).
jest.mock("@modules/core/network/shared/lib", () => ({
	...jest.requireActual("@modules/core/network/shared/lib/store/network"),
	...jest.requireActual(
		"@modules/core/network/shared/lib/store/actions/tcp/tcpClient",
	),
}));

const { network, setHostIP } = jest.requireActual(
	"@modules/core/network/shared/lib/store/network",
);

const reducer = combineReducers({ network: network.reducer });

/**
 * `restartTCPClientSaga.ts` throttles via a module-level `lastRestartTime` variable, not saga
 * state, so it leaks across tests in the same file unless the module is freshly required each
 * time. Per saga-testing-setup memory: `jest.isolateModules` + fresh `require` per test.
 */
const loadSaga = () => {
	let mod: typeof import("../restartTCPClientSaga");
	jest.isolateModules(() => {
		mod = require("../restartTCPClientSaga");
	});
	// biome-ignore lint: isolateModules assigns synchronously above
	return mod!.restartTCPClientSaga;
};

describe("restartTCPClientSaga", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("stops and restarts the client with the current hostIP", async () => {
		const restartTCPClientSaga = loadSaga();
		const { restartTCPClient } = require("../restartTCPClient");
		const {
			stopTCPClient,
			startTCPClient,
		} = require("@modules/core/network/shared/lib");

		const state = reducer(
			reducer(undefined, { type: "@@init" }),
			setHostIP("192.168.1.20"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(restartTCPClientSaga);

		tester.dispatch(restartTCPClient());
		await jest.advanceTimersByTimeAsync(100);

		expect(tester.ofType(stopTCPClient.type)).toHaveLength(1);
		const starts = tester.ofType(startTCPClient.type);
		expect(starts).toHaveLength(1);
		expect((starts[0] as ReturnType<typeof startTCPClient>).payload).toEqual({
			host: "192.168.1.20",
		});
	});

	it("does nothing when hostIP is not set", async () => {
		const restartTCPClientSaga = loadSaga();
		const { restartTCPClient } = require("../restartTCPClient");
		const {
			stopTCPClient,
			startTCPClient,
		} = require("@modules/core/network/shared/lib");

		const tester = createSagaTester({ reducer });
		tester.run(restartTCPClientSaga);

		tester.dispatch(restartTCPClient());
		await jest.advanceTimersByTimeAsync(100);

		expect(tester.ofType(stopTCPClient.type)).toHaveLength(0);
		expect(tester.ofType(startTCPClient.type)).toHaveLength(0);
	});

	it("throttles a second restart within 5s of the first (module-level, not per-saga-instance)", async () => {
		const restartTCPClientSaga = loadSaga();
		const { restartTCPClient } = require("../restartTCPClient");
		const { stopTCPClient } = require("@modules/core/network/shared/lib");

		const state = reducer(
			reducer(undefined, { type: "@@init" }),
			setHostIP("192.168.1.20"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(restartTCPClientSaga);

		tester.dispatch(restartTCPClient());
		await jest.advanceTimersByTimeAsync(100);
		expect(tester.ofType(stopTCPClient.type)).toHaveLength(1);

		tester.dispatch(restartTCPClient());
		await jest.advanceTimersByTimeAsync(100);
		// still just the one from before: the second call landed inside the throttle window
		expect(tester.ofType(stopTCPClient.type)).toHaveLength(1);
	});

	it("allows a restart again once the throttle window has passed", async () => {
		const restartTCPClientSaga = loadSaga();
		const { restartTCPClient } = require("../restartTCPClient");
		const { stopTCPClient } = require("@modules/core/network/shared/lib");

		const state = reducer(
			reducer(undefined, { type: "@@init" }),
			setHostIP("192.168.1.20"),
		);
		const tester = createSagaTester({ reducer, state });
		tester.run(restartTCPClientSaga);

		tester.dispatch(restartTCPClient());
		await jest.advanceTimersByTimeAsync(100);
		expect(tester.ofType(stopTCPClient.type)).toHaveLength(1);

		await jest.advanceTimersByTimeAsync(5_000);

		tester.dispatch(restartTCPClient());
		await jest.advanceTimersByTimeAsync(100);
		expect(tester.ofType(stopTCPClient.type)).toHaveLength(2);
	});
});
