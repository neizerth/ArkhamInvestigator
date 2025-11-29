import type { SkillCheckDifficultyType } from "@modules/board/skill-check/shared/model";
import { isSkillCheckFailed } from "@modules/chaos-bag/result/shared/lib";
import { delay } from "@shared/lib/util";
import memoize from "fast-memoize";
import type { ChaosBagOddsToken } from "../../model";

export type Options = {
	available: ChaosBagOddsToken[];
	revealed?: ChaosBagOddsToken[];
	revealCount?: number;
	skillValue: number;
	difficulty: number;
	difficultyType?: SkillCheckDifficultyType;
};

const getChaosOddsImpl = async (options: Options) => {
	const {
		available,
		revealed = [],
		revealCount = 0,
		skillValue,
		difficulty,
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
			revealCount,
			probability: 1,
		},
	];

	let acc = 0;
	let iterationCount = 0;
	const BATCH_SIZE = 1000; // Process 1000 iterations before yielding to event loop

	while (stack.length > 0) {
		// Add delay periodically to prevent blocking, but not on every iteration
		iterationCount++;
		if (iterationCount % BATCH_SIZE === 0) {
			await delay(0);
		}

		const frame = stack.pop();
		if (!frame) continue;

		const {
			available: currentAvailable,
			revealed: currentRevealed,
			revealCount: currentRevealCount,
			probability: currentProbability,
		} = frame;

		//
		// BASE CASE
		//
		if (currentRevealCount === 0) {
			const failed = isSkillCheckFailed({
				skillValue,
				difficulty,
				difficultyType,
				tokens: currentRevealed,
			});

			if (!failed) {
				acc += currentProbability;
			}

			continue;
		}

		//
		// EXPAND NODE
		//
		const tokensCount = currentAvailable.length;

		// If no tokens available, skip this frame
		if (tokensCount === 0) {
			continue;
		}

		for (let i = 0; i < tokensCount; i++) {
			const token = currentAvailable[i];
			const nextProbability = currentProbability * (1 / tokensCount);

			// IMPORTANT FIX: canceled tokens contribute 0 value and revealCount = 0
			const extraReveals =
				!token.canceled && token.revealCount > 0 ? token.revealCount : 0;

			const nextRevealCount = currentRevealCount - 1 + extraReveals;

			const nextRevealed = token.canceled
				? currentRevealed // canceled → do NOT append to revealed
				: [...currentRevealed, token];

			// Remove the drawn token from available for the next frame
			const nextAvailable = currentAvailable.filter((_, index) => index !== i);

			stack.push({
				available: nextAvailable,
				revealed: nextRevealed,
				revealCount: nextRevealCount,
				probability: nextProbability,
			});
		}
	}

	console.log("iterationCount", iterationCount);

	// return in percentage with 2 decimals
	return Math.round(acc * 100);
};

// Custom serializer for memoization cache key
const serializer = (args: unknown[]) => {
	const [options] = args as [Options];
	return JSON.stringify({
		available: options.available,
		revealed: options.revealed || [],
		revealCount: options.revealCount ?? 0,
		skillValue: options.skillValue,
		difficulty: options.difficulty,
		difficultyType: options.difficultyType || "gte",
	});
};

export const getChaosOdds = memoize(getChaosOddsImpl, {
	strategy: memoize.strategies.variadic,
	serializer,
});
