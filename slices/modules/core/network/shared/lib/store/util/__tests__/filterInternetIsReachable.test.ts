import { internetReachabilityChanged } from "../../actions";
import { filterInternetIsReachable } from "../filterInternetIsReachable";

describe("filterInternetIsReachable", () => {
	it("returns false for an unrelated action", () => {
		const filter = filterInternetIsReachable(true);
		expect(filter({ type: "some/other" })).toBe(false);
	});

	it("returns true when the payload matches the requested reachability", () => {
		const filter = filterInternetIsReachable(true);
		expect(filter(internetReachabilityChanged(true))).toBe(true);
	});

	it("returns false when the payload does not match the requested reachability", () => {
		const filter = filterInternetIsReachable(true);
		expect(filter(internetReachabilityChanged(false))).toBe(false);
	});

	it("matches the false case symmetrically", () => {
		const filter = filterInternetIsReachable(false);
		expect(filter(internetReachabilityChanged(false))).toBe(true);
		expect(filter(internetReachabilityChanged(true))).toBe(false);
	});
});
