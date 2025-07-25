import type { ChaosBagEffects } from "@modules/chaos-bag/effect/shared/model";
import { mergeWith } from "ramda";

export const mergeTokenEffects = (
	effects1: ChaosBagEffects,
	effects2: ChaosBagEffects,
): ChaosBagEffects => {
	return mergeWith((x, y) => `${x}\n${y}`, effects1, effects2);
};
