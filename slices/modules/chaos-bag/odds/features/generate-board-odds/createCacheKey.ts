import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { isNumber } from "ramda-adjunct";
import type { ChaosBagOddsToken } from "../../entities/model";

const getValueForSort = (value: ChaosTokenValue): number => {
	if (isNumber(value)) {
		return value;
	}

	return value === "fail" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
};

/**
 * Creates a stable cache key based on tokens.
 * Normalizes and sorts tokens to ensure key stability.
 */
export const createCacheKey = (tokens: ChaosBagOddsToken[]): string => {
	const normalized = tokens
		.map(({ type, value = 0, revealCount, revealId }) => ({
			type,
			value,
			revealCount,
			revealId: revealId ?? null,
		}))
		.sort((a, b) => {
			if (a.type !== b.type) return a.type.localeCompare(b.type);
			if (a.value !== b.value)
				return getValueForSort(a.value) - getValueForSort(b.value);
			if (a.revealCount !== b.revealCount) return a.revealCount - b.revealCount;
			if (a.revealId !== b.revealId) {
				if (!a.revealId) return -1;
				if (!b.revealId) return 1;
				return a.revealId.localeCompare(b.revealId);
			}
			return 0;
		});

	return JSON.stringify(normalized);
};
