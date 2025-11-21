import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ChaosBagEffectHandler } from "../../../../model";

export type SetChaosTokenOptionInternalPayload = {
	type: ChaosTokenType;
	optionIndex: number | null;
};

export const handleSetChaosTokenOptionInternal: ChaosBagEffectHandler<
	SetChaosTokenOptionInternalPayload
> = (state, { type, optionIndex }) => {
	state.chaosTokenOptions = {
		...state.chaosTokenOptions,
		[type]: optionIndex,
	};
};
