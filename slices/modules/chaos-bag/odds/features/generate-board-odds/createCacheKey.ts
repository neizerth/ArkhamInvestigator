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
 * Includes token count to detect when tokens are added/removed.
 */
export const createCacheKey = (tokens: ChaosBagOddsToken[]): string => {
	// Early return for empty tokens
	if (!tokens || tokens.length === 0) {
		return JSON.stringify({
			totalCount: 0,
			groups: [],
		});
	}

	// Group tokens by their properties and count occurrences
	// This ensures that adding/removing tokens with same properties changes the key
	const groups = new Map<string, number>();

	for (const token of tokens) {
		if (!token) {
			continue; // Skip null/undefined tokens
		}
		const key = JSON.stringify({
			type: token.type,
			value: token.value ?? 0,
			revealCount: token.revealCount,
			revealId: token.revealId ?? null,
		});
		groups.set(key, (groups.get(key) ?? 0) + 1);
	}

	// Sort groups by key for stability
	const sorted = Array.from(groups.entries()).sort(([a], [b]) =>
		a.localeCompare(b),
	);

	// Include count in the key
	const normalized = sorted.map(([key, count]) => {
		const parsed = JSON.parse(key);
		// Safely spread parsed object, ensure it's an object before spreading
		if (
			typeof parsed === "object" &&
			parsed !== null &&
			!Array.isArray(parsed)
		) {
			return {
				...parsed,
				count,
			};
		}
		// Fallback: if parsed is not an object, create object with count only
		return {
			count,
		};
	});

	// Include total token count to ensure key changes when tokens are added/removed
	// This is a safety measure in case grouping doesn't catch all changes
	return JSON.stringify({
		totalCount: tokens.length,
		groups: normalized,
	});
};
