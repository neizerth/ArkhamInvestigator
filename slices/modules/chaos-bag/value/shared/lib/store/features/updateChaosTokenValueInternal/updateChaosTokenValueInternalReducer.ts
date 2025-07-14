import type { ChaosTokenValueReducer } from "@modules/chaos-bag/value/shared/model";
import {
	type HandleUpdateChaosTokenValueInternalPayload,
	handleUpdateChaosTokenValueInternal,
} from "./handleUpdateChaosTokenValueInternal";

export const updateChaosTokenValueInternalReducer: ChaosTokenValueReducer<
	HandleUpdateChaosTokenValueInternalPayload
> = (state, { payload }) => {
	handleUpdateChaosTokenValueInternal(state, payload);
};
