import type { PropsWithBoard } from "@modules/board/base/shared/model";
import type { ChaosTokenValues } from "@modules/chaos-bag/base/shared/model";
import type { ChaosBagEffects } from "@modules/chaos-bag/effect/shared/model";

export type ChaosBagEffectModificationCallbackOptions = PropsWithBoard & {
	defaultEffects: ChaosBagEffects;
	signatureEffects: ChaosBagEffects;
	referenceCardEffects: ChaosBagEffects;
	tokenValues: ChaosTokenValues;
};

export type ChaosBagEffectModificationCallback = (
	options: ChaosBagEffectModificationCallbackOptions,
) => string | undefined;

export type ChaosBagEffectModification = Record<
	string,
	ChaosBagEffectModificationCallback
>;
