import type { ChaosBagEffectReducer } from "../../../../model";
import {
	type SetChaosTokenOptionInternalPayload,
	handleSetChaosTokenOptionInternal,
} from "./handleSetChaosTokenOptionInternal";

export const setChaosTokenOptionInternalReducer: ChaosBagEffectReducer<
	SetChaosTokenOptionInternalPayload
> = (state, { payload }) => {
	handleSetChaosTokenOptionInternal(state, payload);
};
