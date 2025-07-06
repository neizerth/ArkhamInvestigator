import type { ChaosTokenValueReducer } from "../../../model";
import {
	type HandleUpdateChaosTokenValueInternalPayload,
	handleUpdateChaosTokenValueInternal,
} from "../handlers";

export const updateChaosTokenValueInternal: ChaosTokenValueReducer<
	HandleUpdateChaosTokenValueInternalPayload
> = (state, { payload }) => {
	handleUpdateChaosTokenValueInternal(state, payload);
};
