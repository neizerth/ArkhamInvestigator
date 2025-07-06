import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ChaosTokenValueHandler } from "../../../model";

export type HandleUpdateChaosTokenValueInternalPayload = {
	type: ChaosTokenType;
	value: number;
};

export const handleUpdateChaosTokenValueInternal: ChaosTokenValueHandler<
	HandleUpdateChaosTokenValueInternalPayload
> = (state, { type, value }) => {
	state.chaosTokenValue = {
		...state.chaosTokenValue,
		[type]: value,
	};
};
