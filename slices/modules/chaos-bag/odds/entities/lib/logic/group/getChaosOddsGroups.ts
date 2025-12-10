import { groupBy, isNotNil } from "ramda";
import type { ChaosBagOddsToken, ChaosOddsGroup } from "../../../model";
import { getChaosOddsGroupId } from "./getChaosOddsGroupId";

export const getChaosOddsGroups = (
	tokens: ChaosBagOddsToken[],
): ChaosOddsGroup[] => {
	return Object.values(groupBy(getChaosOddsGroupId, tokens))
		.map((tokens, index) => {
			const token = tokens?.[0];

			if (!token) {
				return null;
			}

			const groupIndex = index.toString(36);
			const count = tokens.length;

			return {
				groupIndex,
				token,
				count,
			};
		})
		.filter(isNotNil);
};
