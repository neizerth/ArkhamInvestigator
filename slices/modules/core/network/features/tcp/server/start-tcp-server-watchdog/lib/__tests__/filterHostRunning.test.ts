import { setHostRunning } from "@modules/core/network/shared/lib";
import { filterHostRunning } from "../filterHostRunning";

describe("filterHostRunning", () => {
	it("matches setHostRunning with the exact requested status", () => {
		expect(filterHostRunning(true)(setHostRunning(true))).toBe(true);
		expect(filterHostRunning(false)(setHostRunning(false))).toBe(true);
	});

	it("rejects setHostRunning with a different status", () => {
		expect(filterHostRunning(true)(setHostRunning(false))).toBe(false);
		expect(filterHostRunning(false)(setHostRunning(true))).toBe(false);
	});

	it("rejects unrelated actions", () => {
		expect(filterHostRunning(true)({ type: "some/other" })).toBe(false);
	});
});
