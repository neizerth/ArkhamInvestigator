import { fetch } from "@react-native-community/netinfo";
import { createSagaTester } from "@shared/lib/test/createSagaTester";
import { checkNetwork, networkChecked } from "../checkNetwork";
import { checkNetworkSaga } from "../checkNetworkSaga";

// jest.setup.ts already mocks the whole module with the library's official jest mock (`fetch` is a
// jest.fn() resolving to a default state) — just point that existing mock at what this test needs
// instead of re-mocking the module (re-mocking it here caused every fake timer / open handle from
// the official mock to be replaced without cleanup, which hung the whole test file).
const mockFetch = fetch as jest.Mock;

describe("checkNetworkSaga", () => {
	it("fetches NetInfo state and dispatches the result", async () => {
		mockFetch.mockResolvedValueOnce({ type: "wifi", isConnected: true });
		const tester = createSagaTester();
		tester.run(checkNetworkSaga);

		tester.dispatch(checkNetwork());
		await Promise.resolve();
		await Promise.resolve();

		const results = tester.ofType(networkChecked.type) as unknown as Array<{
			payload: { type: string; isConnected: boolean };
		}>;
		expect(results).toHaveLength(1);
		expect(results[0].payload).toEqual({ type: "wifi", isConnected: true });
	});

	/**
	 * FIXED bug (found + fixed 2026-09-28, no prior report): `checkNetwork` and `networkChecked`
	 * used to share the exact same action type string (copy-paste typo in checkNetwork.ts). Since
	 * this saga's `takeEvery` matches on `checkNetwork.match`, dispatching `networkChecked` (with
	 * the same type) re-triggered the worker forever — an infinite fetch/dispatch loop. This test
	 * hung the entire test file (and eventually OOM-crashed the Jest worker) the moment it first ran
	 * against the un-fixed code, which is how this was actually found — not by inspection.
	 * `checkNetwork()` was never dispatched anywhere in the app as of the fix, so this never fired in
	 * production, but it's a landmine for whenever that changes.
	 */
	it("does not re-trigger itself: dispatching networkChecked does not fetch again", async () => {
		mockFetch.mockClear();
		mockFetch.mockResolvedValue({ type: "wifi", isConnected: true });
		const tester = createSagaTester();
		tester.run(checkNetworkSaga);

		tester.dispatch(checkNetwork());
		await Promise.resolve();
		await Promise.resolve();

		expect(mockFetch).toHaveBeenCalledTimes(1);
		expect(tester.ofType(networkChecked.type)).toHaveLength(1);
	});
});
