import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import {
	type HandleUpdateChaosTokenValueInternalPayload,
	handleUpdateChaosTokenValueInternal,
} from "../handlers";

export const updateChaosTokenValueInternal: ChaosBagReducer<
	HandleUpdateChaosTokenValueInternalPayload
> = (state, { payload }) => {
	handleUpdateChaosTokenValueInternal(state, payload);
};
