import type { ChaosBagEffectReducer } from "../../../../model";
import {
	type SetBoardChaosTokenOptionInternalPayload,
	handleSetBoardChaosTokenOptionInternal,
} from "./handleSetBoardChaosTokenOptionInternal";

export const setBoardChaosTokenOptionInternalReducer: ChaosBagEffectReducer<
	SetBoardChaosTokenOptionInternalPayload
> = (state, { payload }) => {
	handleSetBoardChaosTokenOptionInternal(state, payload);
};
