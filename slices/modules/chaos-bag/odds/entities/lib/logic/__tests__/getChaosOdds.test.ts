import type { ChaosBagOddsToken } from "../../../model";
import { getChaosOdds } from "../getChaosOdds";

let tokenId = 0;
const buildToken = (
	overrides: Partial<ChaosBagOddsToken> = {},
): ChaosBagOddsToken => ({
	id: overrides.id ?? `token-${tokenId++}`,
	type: "0",
	value: 0,
	revealCount: 0,
	...overrides,
});

describe("getChaosOdds", () => {
	afterEach(() => {
		tokenId = 0;
	});

	it("returns 100% when no more reveals are needed and the skill test passes", async () => {
		const result = await getChaosOdds({
			available: [buildToken()],
			revealed: [buildToken({ value: 0 })],
			revealCount: 0,
			skillValue: 3,
			difficulty: 3,
			difficultyType: "gte",
		});

		expect(result).toBe(100);
	});

	it("returns zero probability when the initial revealed tokens already fail the test", async () => {
		const result = await getChaosOdds({
			available: [buildToken()],
			revealed: [buildToken({ type: "autoFail", value: "fail" })],
			revealCount: 0,
			skillValue: 5,
			difficulty: 3,
			difficultyType: "gte",
		});

		expect(result).toBe(0);
	});

	it("computes odds for a single reveal using the distribution of tokens in the bag", async () => {
		const tokens = [
			buildToken({ id: "good", value: 0 }),
			buildToken({ id: "bad", value: -4 }),
		];

		const result = await getChaosOdds({
			available: tokens,
			revealCount: 1,
			skillValue: 4,
			difficulty: 3,
			difficultyType: "gte",
		});

		// good: 4 + 0 = 4 >= 3 → success (50%)
		// bad: 4 + (-4) = 0 < 3 → fail (50%)
		expect(result).toBe(50);
	});

	it("accounts for multiple reveals by aggregating probabilities across all permutations", async () => {
		const tokens = [
			buildToken({ id: "good", value: 0 }),
			buildToken({ id: "bad", value: -4 }),
		];

		const result = await getChaosOdds({
			available: tokens,
			revealCount: 2,
			skillValue: 4,
			difficulty: 3,
			difficultyType: "gte",
		});

		// Only good+good: 4 + 0 + 0 = 4 >= 3 → success (25%)
		// All other combinations fail
		expect(result).toBe(25);
	});

	it("returns 50% for two tokens with values -2 and -3, skillValue 4, difficulty 2, revealCount 1", async () => {
		const tokens = [
			buildToken({ id: "token1", value: -2 }),
			buildToken({ id: "token2", value: -3 }),
		];

		const result = await getChaosOdds({
			available: tokens,
			revealCount: 1,
			skillValue: 4,
			difficulty: 2,
			difficultyType: "gte",
		});

		// token1: 4 + (-2) = 2 >= 2 → success (50%)
		// token2: 4 + (-3) = 1 < 2 → fail (50%)
		expect(result).toBe(50);
	});
});
