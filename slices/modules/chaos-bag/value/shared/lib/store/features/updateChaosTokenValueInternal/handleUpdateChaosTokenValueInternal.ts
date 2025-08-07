import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type {
	ChaosTokenValue,
	ChaosTokenValueHandler,
} from "@modules/chaos-bag/value/shared/model";

export type HandleUpdateChaosTokenValueInternalPayload = {
	type: ChaosTokenType;
	value: ChaosTokenValue;
};

export const handleUpdateChaosTokenValueInternal: ChaosTokenValueHandler<
	HandleUpdateChaosTokenValueInternalPayload
> = (state, { type, value }) => {
	state.chaosTokenValue = {
		...state.chaosTokenValue,
		[type]: value,
	};
};
