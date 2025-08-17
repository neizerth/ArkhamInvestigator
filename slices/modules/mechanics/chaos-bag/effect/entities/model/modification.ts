import type { PropsWithBoard } from "@modules/board/base/shared/model";
import type { ChaosTokenValues } from "@modules/chaos-bag/base/shared/model";
import type { ChaosBagEffects } from "@modules/chaos-bag/effect/shared/model";

export type InvestigatorTokenEffectModificationCallbackOptions =
	PropsWithBoard & {
		defaultEffects: ChaosBagEffects;
		signatureEffects: ChaosBagEffects;
		referenceCardEffects: ChaosBagEffects;
		tokenValues: ChaosTokenValues;
	};

export type InvestigatorTokenEffectModificationCallback = (
	options: InvestigatorTokenEffectModificationCallbackOptions,
) => ChaosBagEffects;

export type InvestigatorTokenEffectModification = Record<
	string,
	InvestigatorTokenEffectModificationCallback
>;
