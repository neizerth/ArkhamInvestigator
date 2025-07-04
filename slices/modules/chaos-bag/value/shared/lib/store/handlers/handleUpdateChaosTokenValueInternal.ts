import type {
	ChaosBagHandler,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";

export type HandleUpdateChaosTokenValueInternalPayload = {
	type: ChaosTokenType;
	value: number;
};

export const handleUpdateChaosTokenValueInternal: ChaosBagHandler<
	HandleUpdateChaosTokenValueInternalPayload
> = (state, { type, value }) => {
	state.chaosTokenValue = {
		...state.chaosTokenValue,
		[type]: value,
	};
};
