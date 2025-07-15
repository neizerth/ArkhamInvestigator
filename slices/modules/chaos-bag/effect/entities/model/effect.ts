import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import type { ChaosBagEffects } from "../../shared/model";

export type ChaosBagEffectsCallbackOptions = {
	tokens: ChaosBagToken[];
	revealedTokens: ChaosBagToken[];
};

export type ChaosBagEffectsCallback = (
	options: ChaosBagEffectsCallbackOptions,
) => ChaosBagEffects;
