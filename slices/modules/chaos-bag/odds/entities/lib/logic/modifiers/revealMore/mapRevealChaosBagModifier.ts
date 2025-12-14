import { AUTO_SUCCESS_VALUE } from "@modules/chaos-bag/odds/entities/config";
import memoize from "fast-memoize";
import * as mathjs from "mathjs";
import type {
	ChaosOddsCache,
	ChaosOddsCacheItem,
	ChaosOddsGroup,
	ChaosOddsTokenGroupCount,
} from "../../../../model";

type Options = {
	groups: ChaosOddsGroup[];
	cache?: ChaosOddsCache;
	revealedFrostCount: number;
};

type ChaosOddsProcessingCacheItem = ChaosOddsCacheItem & {
	pendingReveal?: number;
};

/**
 * Incrementally expands chaos bag cache for tokens with revealCount >= 1.
 *
 * - Correctly accounts for group.count (token multiplicity)
 * - Avoids duplicate states using a canonical Map key
 * - Accumulates probability instead of storing permutations
 * - Finalizes probability using multinomial once pendingReveal === 0
 */
export const mapRevealChaosBagModifier = (options: Options) => {
	const multinomial = memoize((...args: number[]) => mathjs.multinomial(args));
	const { groups, cache = [], revealedFrostCount } = options;

	const revealGroups = groups.filter(({ token }) => token.revealCount > 0);
	if (revealGroups.length === 0) {
		return cache;
	}

	// ---------- Step 1: Build a Map for deduplication ----------
	const cacheMap = new Map<string, ChaosOddsProcessingCacheItem>();
	for (const item of cache) {
		const key = buildCacheKey(item);
		cacheMap.set(key, item);
	}

	// ---------- Step 2: Initialize reveal-processing states ----------
	const itemsToProcess: ChaosOddsProcessingCacheItem[] = [];

	const totalCount = groups.reduce((acc, { count }) => acc + count, 0);

	for (const group of revealGroups) {
		const { revealCount, value = 0 } = group.token;

		if (value === "fail") {
			continue;
		}

		// Build initial available map (full bag)
		const availableMap = groups.reduce((acc, { groupIndex, count }) => {
			acc[groupIndex] = count;
			return acc;
		}, {} as ChaosOddsTokenGroupCount);

		// Initial probability = chance to draw this reveal token
		const probability = group.count / totalCount;

		// Remove the drawn reveal token from the bag
		availableMap[group.groupIndex] -= 1;

		// Initial modifier should be the value of the reveal token itself
		const initialValueModifier =
			value === "success" ? AUTO_SUCCESS_VALUE : value;

		itemsToProcess.push({
			modifier: initialValueModifier,
			probability,
			availableMap,
			availableCount: totalCount - 1,
			revealMap: {},
			pendingReveal: revealCount,
		});
	}

	// ---------- Step 3: Process reveal chains ----------
	while (itemsToProcess.length) {
		const item = itemsToProcess.pop();
		if (!item) {
			break;
		}
		const {
			pendingReveal = 0,
			revealMap = {},
			availableMap,
			availableCount,
		} = item;

		// ---------- Final state ----------
		if (pendingReveal === 0) {
			const counts = Object.values(revealMap).filter(Boolean).sort();
			if (counts.length > 0) {
				item.probability *= multinomial(...counts);
			}
			cache.push(item);
			continue;
		}

		// ---------- Expand reveal ----------
		for (const group of groups) {
			const available = availableMap[group.groupIndex] ?? 0;
			if (available === 0) continue;

			const { token } = group;
			const { value = 0 } = token;

			// Skip auto-fail
			if (value === "fail") continue;

			// Frost rule (global)
			if (token.type === "frost" && revealedFrostCount === 1) continue;

			const nextAvailableMap = {
				...availableMap,
				[group.groupIndex]: available - 1,
			};

			const nextAvailableCount = availableCount - 1;

			const nextRevealMap: ChaosOddsTokenGroupCount = {
				...revealMap,
				[group.groupIndex]: (revealMap[group.groupIndex] ?? 0) + 1,
			};

			// Consume one pending reveal, add new ones if needed
			const nextPendingReveal = pendingReveal - 1 + (token.revealCount || 0);

			const stepProbability = item.probability * (available / availableCount);

			const key = buildCacheKey({
				revealMap: nextRevealMap,
				availableCount: nextAvailableCount,
			});

			const existing = cacheMap.get(key);
			if (existing) {
				existing.probability += stepProbability;
				existing.pendingReveal = Math.max(
					existing.pendingReveal ?? 0,
					nextPendingReveal,
				);
				continue;
			}

			const valueModifier = value === "success" ? AUTO_SUCCESS_VALUE : value;

			const newItem: ChaosOddsProcessingCacheItem = {
				modifier: item.modifier + valueModifier,
				probability: stepProbability,
				revealMap: nextRevealMap,
				availableMap: nextAvailableMap,
				availableCount: nextAvailableCount,
				pendingReveal: nextPendingReveal,
			};

			cacheMap.set(key, newItem);
			itemsToProcess.push(newItem);
		}
	}

	return cache;
};

// ---------- Helpers ----------

type CacheKeySource = {
	revealMap?: ChaosOddsTokenGroupCount;
	availableCount: number;
};

/**
 * Canonical key representing a multiset reveal state + remaining bag size.
 */
const buildCacheKey = ({ revealMap = {}, availableCount }: CacheKeySource) => {
	const hash = Object.entries(revealMap)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([k, v]) => `${k}:${v}`)
		.join(",");

	return `${hash}|${availableCount}`;
};
