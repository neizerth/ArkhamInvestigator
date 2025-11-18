import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";

export type ChaosBagEffects = Partial<Record<ChaosTokenType, string>>;

export type ChaosTokenEffectRevealCount = Partial<
	Record<ChaosTokenType, number>
>;
