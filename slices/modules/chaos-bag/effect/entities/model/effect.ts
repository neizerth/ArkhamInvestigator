import type {
	ChaosBagToken,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";

export type ChaosBagEffects = Partial<Record<ChaosTokenType, string>>;

export type ChaosBagEffectsCallbackOptions = {
	tokens: ChaosBagToken[];
	revealedTokens: ChaosBagToken[];
};

export type ChaosBagEffectsCallback = (
	options: ChaosBagEffectsCallbackOptions,
) => ChaosBagEffects;
