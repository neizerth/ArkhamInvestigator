import type { ChaosBagEffectReducer } from "../../../../model";
import {
	type RemoveBoardChaosTokenOptionInternalPayload,
	handleRemoveBoardChaosTokenOptionInternal,
} from "./handleRemoveBoardChaosTokenOptionInternal";

export const removeBoardChaosTokenOptionInternalReducer: ChaosBagEffectReducer<
	RemoveBoardChaosTokenOptionInternalPayload
> = (state, { payload }) => {
	handleRemoveBoardChaosTokenOptionInternal(state, payload);
};
