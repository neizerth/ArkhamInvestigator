import type { ChaosBagOddsToken } from "../../../../model";
import { getChaosTokenRevealOdds } from "../getChaosTokenRevealOdds";

describe("getChaosTokenRevealOdds", () => {
	it("should return 0.5 probability for -2 when tokens are -2, -1, bless (bless has revealCount > 0)", () => {
		const tokens: ChaosBagOddsToken[] = [
			{
				id: "1",
				type: "-2",
				value: -2,
				revealCount: 0,
			},
			{
				id: "2",
				type: "-1",
				value: -1,
				revealCount: 0,
			},
			{
				id: "3",
				type: "bless",
				value: 2,
				revealCount: 1,
			},
		];

		const result = getChaosTokenRevealOdds({
			token: tokens[0], // -2
			tokens,
		});

		expect(result).toBe(0.5);
	});

	it("should return 0.5 probability for -1 when tokens are -2, -1, bless (bless has revealCount > 0)", () => {
		const tokens: ChaosBagOddsToken[] = [
			{
				id: "1",
				type: "-2",
				value: -2,
				revealCount: 0,
			},
			{
				id: "2",
				type: "-1",
				value: -1,
				revealCount: 0,
			},
			{
				id: "3",
				type: "bless",
				value: 2,
				revealCount: 1,
			},
		];

		const result = getChaosTokenRevealOdds({
			token: tokens[1], // -1
			tokens,
		});

		expect(result).toBe(0.5);
	});

	it("should return 1/3 probability for bless when tokens are -2, -1, bless (bless has revealCount > 0)", () => {
		const tokens: ChaosBagOddsToken[] = [
			{
				id: "1",
				type: "-2",
				value: -2,
				revealCount: 0,
			},
			{
				id: "2",
				type: "-1",
				value: -1,
				revealCount: 0,
			},
			{
				id: "3",
				type: "bless",
				value: 2,
				revealCount: 1,
			},
		];

		const result = getChaosTokenRevealOdds({
			token: tokens[2], // bless
			tokens,
		});

		expect(result).toBe(1 / 3);
	});

	it("should return correct probability for -1 when tokens are -1, -2, -2, -2, -3, custom with revealCount = 2", () => {
		const tokens: ChaosBagOddsToken[] = [
			{
				id: "1",
				type: "-1",
				value: -1,
				revealCount: 0,
			},
			{
				id: "2",
				type: "-2",
				value: -2,
				revealCount: 0,
			},
			{
				id: "3",
				type: "-2",
				value: -2,
				revealCount: 0,
			},
			{
				id: "4",
				type: "-2",
				value: -2,
				revealCount: 0,
			},
			{
				id: "5",
				type: "-3",
				value: -3,
				revealCount: 0,
			},
			{
				id: "6",
				type: "custom",
				value: 0,
				revealCount: 2,
			},
		];

		const expectedProbability = 0.5 * (1 / 5 + 1 - (1 - 1 / 5) ** 2);

		const result = getChaosTokenRevealOdds({
			token: tokens[0], // -1
			tokens,
		});

		expect(result).toBe(expectedProbability);
	});

	it("should return correct probability for 0 when tokens are 0, 0, 0, -3, -4, -8, -8, 2 x bless (revealCount = 1), 2 x custom (revealCount = 2)", () => {
		const tokens: ChaosBagOddsToken[] = [
			{
				id: "1",
				type: "0",
				value: 0,
				revealCount: 0,
			},
			{
				id: "2",
				type: "0",
				value: 0,
				revealCount: 0,
			},
			{
				id: "3",
				type: "0",
				value: 0,
				revealCount: 0,
			},
			{
				id: "4",
				type: "-3",
				value: -3,
				revealCount: 0,
			},
			{
				id: "5",
				type: "-4",
				value: -4,
				revealCount: 0,
			},
			{
				id: "6",
				type: "-8",
				value: -8,
				revealCount: 0,
			},
			{
				id: "7",
				type: "-8",
				value: -8,
				revealCount: 0,
			},
			{
				id: "8",
				type: "bless",
				value: 2,
				revealCount: 1,
			},
			{
				id: "9",
				type: "bless",
				value: 2,
				revealCount: 1,
			},
			{
				id: "10",
				type: "custom",
				value: 0,
				revealCount: 2,
			},
			{
				id: "11",
				type: "custom",
				value: 0,
				revealCount: 2,
			},
		];

		const baseProbability = 3 / 7;
		const expectedProbability =
			(1 / 3) *
			(baseProbability +
				1 -
				(1 - baseProbability) ** 2 +
				1 -
				(1 - baseProbability) ** 3);

		const result = getChaosTokenRevealOdds({
			token: tokens[0], // 0
			tokens,
		});

		expect(result).toBeCloseTo(expectedProbability, 10);
	});
});
