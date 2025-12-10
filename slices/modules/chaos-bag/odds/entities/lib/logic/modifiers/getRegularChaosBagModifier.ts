import type { ChaosOddsGroup } from "../../../model";
import { getRegularChaosTokenModifier } from "./getRegularChaosTokenModifier";

export const getRegularChaosBagModifier = (groups: ChaosOddsGroup[]) => {
	const cache: Record<string, number> = {};

	for (const group of groups) {
		const { groupIndex, token } = group;
		const modifier = getRegularChaosTokenModifier(token);
		cache[groupIndex] = modifier;
	}

	return cache;
};
