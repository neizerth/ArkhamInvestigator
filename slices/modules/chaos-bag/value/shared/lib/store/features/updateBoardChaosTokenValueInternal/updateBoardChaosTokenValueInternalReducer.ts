import type { ChaosTokenValueReducer } from "@modules/chaos-bag/value/shared/model";
import {
	type HandleUpdateBoardChaosTokenValueInternalPayload,
	handleUpdateBoardChaosTokenValueInternal,
} from "./handleUpdateBoardChaosTokenValueInternal";

export const updateBoardChaosTokenValueInternalReducer: ChaosTokenValueReducer<
	HandleUpdateBoardChaosTokenValueInternalPayload
> = (state, { payload }) => {
	handleUpdateBoardChaosTokenValueInternal(state, payload);
};
