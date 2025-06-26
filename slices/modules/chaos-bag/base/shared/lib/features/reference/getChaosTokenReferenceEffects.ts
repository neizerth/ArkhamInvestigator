import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ReferencePart } from "arkham-investigator-data";

export const getChaosBagTokenReferenceEffects = (data: ReferencePart[]) => {
	return data.reduce(
		(acc, entry) => {
			if (entry.type === "single") {
				acc[entry.token] = entry.effect;
				return acc;
			}
			for (const token of entry.tokens) {
				acc[token] = entry.effect;
			}
			return acc;
		},
		{} as Partial<Record<ChaosTokenType, string>>,
	);
};
