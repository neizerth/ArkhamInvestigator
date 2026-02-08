import type { ReferenceCardTokenCounter } from "arkham-investigator-data";
import { getCounterRange } from "../getCounterRange";

jest.mock("@modules/chaos-bag/value/shared/config", () => ({
	defaultChaosTokenValue: { min: -9, max: 10 },
}));

const counter = (
	options: Partial<ReferenceCardTokenCounter>,
): ReferenceCardTokenCounter =>
	Object.assign(
		{ type: "counter" as const, step: 1, token: "0" as const },
		options,
	);

describe("getCounterRange", () => {
	it("returns default range [-9..10] when only step is given", () => {
		expect(getCounterRange(counter({ step: 1 }))).toEqual([
			-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
		]);
	});

	it("uses default max 10 when max is omitted", () => {
		expect(getCounterRange(counter({ step: 1, min: 0 }))).toEqual([
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
		]);
	});

	it("computes min from MIN_VALUE when min is omitted (step 2)", () => {
		// Math.ceil(-9/2)*2 = -8; rangeStep(step, from, to) has exclusive to, so max 10 is passed as 11 → last value 8
		expect(getCounterRange(counter({ step: 2 }))).toEqual([
			-8, -6, -4, -2, 0, 2, 4, 6, 8,
		]);
	});

	it("computes min from MIN_VALUE when min is omitted (step 5)", () => {
		// Math.ceil(-9/5)*5 = -5; to=11 → last value 5
		expect(getCounterRange(counter({ step: 5 }))).toEqual([-5, 0, 5]);
	});

	it("respects explicit min and max", () => {
		expect(getCounterRange(counter({ step: 1, min: 2, max: 5 }))).toEqual([
			2, 3, 4, 5,
		]);
	});

	it("respects custom max with default min (step 1)", () => {
		expect(getCounterRange(counter({ step: 1, max: 3 }))).toEqual([
			-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3,
		]);
	});

	it("respects custom min with default max (step 1)", () => {
		expect(getCounterRange(counter({ step: 1, min: 8 }))).toEqual([8, 9, 10]);
	});

	it("returns single value when min equals max", () => {
		expect(getCounterRange(counter({ step: 1, min: 5, max: 5 }))).toEqual([5]);
	});

	it("returns empty array when range is invalid (min > max)", () => {
		expect(getCounterRange(counter({ step: 1, min: 10, max: 0 }))).toEqual([]);
	});

	it("uses step for spacing", () => {
		// rangeStep(3, 0, 10) → 0, 3, 6 (to is exclusive; 9 is not included)
		expect(getCounterRange(counter({ step: 3, min: 0, max: 9 }))).toEqual([
			0, 3, 6,
		]);
	});

	it("includes max when step is 1 (default range)", () => {
		const result = getCounterRange(counter({ step: 1 }));
		expect(result[result.length - 1]).toBe(10);
	});
});
