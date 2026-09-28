import { isTCPIncomeAction } from "../isTCPIncomeAction";

describe("isTCPIncomeAction", () => {
	it("accepts an action with tcp source and string networkId", () => {
		expect(
			isTCPIncomeAction({
				type: "x",
				meta: { source: "tcp", networkId: "abc" },
			}),
		).toBe(true);
	});

	it("rejects a plain action with no meta", () => {
		expect(isTCPIncomeAction({ type: "x" })).toBe(false);
	});

	it("rejects a non-action value", () => {
		expect(isTCPIncomeAction(null)).toBe(false);
		expect(isTCPIncomeAction(undefined)).toBe(false);
		expect(isTCPIncomeAction("x")).toBe(false);
	});

	it("rejects a non-tcp source", () => {
		expect(
			isTCPIncomeAction({
				type: "x",
				meta: { source: "local", networkId: "abc" },
			}),
		).toBe(false);
	});

	it("rejects a tcp action whose networkId is not a string (C4-adjacent: no type/shape allowlist)", () => {
		expect(
			isTCPIncomeAction({
				type: "x",
				meta: { source: "tcp", networkId: 123 },
			}),
		).toBe(false);
	});

	it("rejects a tcp action missing networkId entirely", () => {
		expect(
			isTCPIncomeAction({
				type: "x",
				meta: { source: "tcp" },
			}),
		).toBe(false);
	});

	it("accepts any action type as long as source/networkId shape matches (no allowlist of remote action types)", () => {
		expect(
			isTCPIncomeAction({
				type: "totally/unregistered/type",
				meta: { source: "tcp", networkId: "abc" },
				payload: { arbitrary: "data" },
			}),
		).toBe(true);
	});
});
