import type { SkillCheckDifficultyType } from "@modules/board/skill-check/shared/model";
import { isSkillCheckFailed } from "@modules/chaos-bag/result/shared/lib";
import memoize from "fast-memoize";
import { range } from "ramda";
import type { ChaosBagOddsToken } from "../../model";

export type GetChaosOddsOptions = {
	available: ChaosBagOddsToken[];
	revealed?: ChaosBagOddsToken[];
	skillValue: number;
	difficultyType?: SkillCheckDifficultyType;
};

const difficultyRange = range(0, 100);

const getChaosOddsImpl = async (options: GetChaosOddsOptions) => {
	const {
		available,
		revealed = [],
		skillValue,
		difficultyType = "gte",
	} = options;

	type Frame = {
		available: ChaosBagOddsToken[];
		revealed: ChaosBagOddsToken[];
		revealCount: number;
		probability: number;
	};

	const stack: Frame[] = [
		{
			available,
			revealed,
			revealCount: 1,
			probability: 1,
		},
	];

	const acc: number[] = difficultyRange.map(() => 0);
	let iterationCount = 0;
	const BATCH_SIZE = 100; // Process 1000 iterations before yielding to event loop

	const stateMemo = new Map<string, number[]>();

	while (stack.length > 0) {
		iterationCount++;

		if (iterationCount % BATCH_SIZE === 0) {
			// await delay(0);
			// console.log("next batch at", iterationCount);
		}

		const frame = stack.pop();
		if (!frame) continue;

		const {
			available: currentAvailable,
			revealed: currentRevealed,
			revealCount: currentRevealCount,
			probability: currentProbability,
		} = frame;

		const stateKey = JSON.stringify({
			a: currentAvailable,
			r: currentRevealed,
			rc: currentRevealCount,
		});

		// Reuse memoized subtree
		const cached = stateMemo.get(stateKey);
		if (cached) {
			for (let i = 0; i < 100; i++) {
				acc[i] += cached[i] * currentProbability;
			}
			continue;
		}

		//
		// BASE CASE
		//
		if (currentRevealCount === 0) {
			const local: number[] = new Array(100).fill(0);

			for (const difficulty of difficultyRange) {
				const failed = isSkillCheckFailed({
					skillValue,
					difficultyType,
					difficulty,
					tokens: currentRevealed,
				});

				if (!failed) {
					local[difficulty] = 1;
				}
			}

			// Store pure base result (not scaled)
			stateMemo.set(stateKey, local);

			// Apply to global acc
			for (let i = 0; i < 100; i++) {
				acc[i] += local[i] * currentProbability;
			}

			continue;
		}

		//
		// EXPAND NODE
		//
		const tokensCount = currentAvailable.length;
		if (tokensCount === 0) continue;

		// Local accumulator: sum of all children (unscaled)
		const localAccum = new Array(100).fill(0);

		for (let i = 0; i < tokensCount; i++) {
			const token = currentAvailable[i];
			const nextProbability = 1 / tokensCount;
			const nextRevealCount = currentRevealCount - 1 + token.revealCount;

			const nextRevealed = [...currentRevealed, token];
			const nextAvailable = currentAvailable.filter((_, index) => index !== i);

			stack.push({
				available: nextAvailable,
				revealed: nextRevealed,
				revealCount: nextRevealCount,
				probability: currentProbability * nextProbability,
			});
		}

		// We cannot fill stateMemo here because children haven't run yet.
		// But we DO store empty placeholder to avoid double expansion:
		if (!stateMemo.has(stateKey)) {
			stateMemo.set(stateKey, localAccum);
		}
	}

	console.log("iterationCount", iterationCount);

	// return in percentage with 2 decimals
	return acc.map((value) => Math.round(value * 100));
};

// Custom serializer for memoization cache key
const serializer = (args: unknown[]) => {
	const [options] = args as [GetChaosOddsOptions];
	return JSON.stringify({
		available: options.available,
		revealed: options.revealed,
		skillValue: options.skillValue,
		difficultyType: options.difficultyType,
	});
};

export const getChaosOdds = memoize(getChaosOddsImpl, {
	strategy: memoize.strategies.variadic,
	serializer,
});
