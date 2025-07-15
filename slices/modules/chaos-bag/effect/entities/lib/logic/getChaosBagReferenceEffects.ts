import type { ChaosBagEffects } from "@modules/chaos-bag/effect/shared/model";
import type { ReferencePart } from "arkham-investigator-data";

export const getChaosBagTokenReferenceEffects = (data: ReferencePart[]) => {
	return data.reduce((acc, entry) => {
		if (entry.type === "single") {
			acc[entry.token] = entry.effect;
			return acc;
		}
		for (const token of entry.tokens) {
			acc[token] = entry.effect;
		}
		return acc;
	}, {} as ChaosBagEffects);
};
