import type { ChaosBagEffectsCallback } from "../../../model";
import { getDefaultKnownChaosBagEffects } from "./getDefaultKnownChaosBagEffects";
import { getFrostTokenChaosBagEffects } from "./getFrostTokenChaosBagEffect";

export const defaultChaosBagEffectCallbacks: ChaosBagEffectsCallback[] = [
	getDefaultKnownChaosBagEffects,
	getFrostTokenChaosBagEffects,
];
