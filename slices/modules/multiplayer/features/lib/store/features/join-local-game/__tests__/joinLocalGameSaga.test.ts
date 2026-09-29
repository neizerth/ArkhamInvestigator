import { deeplinkChanged } from "@modules/core/link/shared/lib";
import { network, setNetworkRole } from "@modules/core/network/shared/lib";
import { router, setCurrentRoute } from "@modules/core/router/shared/lib";
import { setHostInviteCode } from "@modules/multiplayer/entities/lib/store/features/setHostInviteCode";
import { combineReducers } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { joinLocalGameSaga } from "../joinLocalGameSaga";

jest.mock("@modules/core/router/shared/lib", () => {
	const actual = jest.requireActual("@modules/core/router/shared/lib");
	return {
		...actual,
		goToPage: (route: string) => ({ type: "router/goToPage", payload: route }),
	};
});

const reducer = combineReducers({
	network: network.reducer,
	router: router.reducer,
});

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.useRealTimers();
});

const buildDeeplink = (overrides: Partial<Record<string, unknown>> = {}) => ({
	pathname: "/join/local",
	query: { invite: "DFGJLQNR" },
	...overrides,
});

describe("joinLocalGameSaga", () => {
	it("sets role to client, navigates, and applies the invite code once the route lands", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(joinLocalGameSaga);

		tester.dispatch(deeplinkChanged(buildDeeplink() as never));
		await Promise.resolve();

		expect(tester.ofType(setNetworkRole.type)).toHaveLength(1);
		expect(
			(
				tester.ofType(setNetworkRole.type)[0] as ReturnType<
					typeof setNetworkRole
				>
			).payload,
		).toBe("client");
		// invite code not applied yet: navigation hasn't "landed" (route not yet visited)
		expect(tester.ofType(setHostInviteCode.type)).toHaveLength(0);

		// the route visit actually lands
		tester.dispatch(setCurrentRoute(routes.startMultiplayer));
		await Promise.resolve();

		expect(tester.ofType(setHostInviteCode.type)).toHaveLength(1);
		expect(
			(
				tester.ofType(setHostInviteCode.type)[0] as ReturnType<
					typeof setHostInviteCode
				>
			).payload,
		).toBe("DFGJLQNR");
	});

	it("still applies the invite code after the 5s navigation timeout even if the route visit is never observed", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(joinLocalGameSaga);

		tester.dispatch(deeplinkChanged(buildDeeplink() as never));
		await Promise.resolve();

		expect(tester.ofType(setHostInviteCode.type)).toHaveLength(0);

		await jest.advanceTimersByTimeAsync(5000);
		await Promise.resolve();

		expect(tester.ofType(setHostInviteCode.type)).toHaveLength(1);
	});

	it("ignores a deeplink for a different pathname", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(joinLocalGameSaga);

		tester.dispatch(
			deeplinkChanged(buildDeeplink({ pathname: "/something/else" }) as never),
		);
		await Promise.resolve();

		expect(tester.ofType(setNetworkRole.type)).toHaveLength(0);
	});

	it("ignores a deeplink with no invite code", async () => {
		const tester = createSagaTester({ reducer });
		tester.run(joinLocalGameSaga);

		tester.dispatch(deeplinkChanged(buildDeeplink({ query: {} }) as never));
		await Promise.resolve();

		expect(tester.ofType(setNetworkRole.type)).toHaveLength(0);
	});
});
