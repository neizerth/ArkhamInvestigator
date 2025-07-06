import type { ChaosTokenValueReducer } from "../../../model";
import {
	type HandleUpdateBoardChaosTokenValueInternalPayload,
	handleUpdateBoardChaosTokenValueInternal,
} from "../handlers";

export const updateBoardChaosTokenValueInternal: ChaosTokenValueReducer<
	HandleUpdateBoardChaosTokenValueInternalPayload
> = (state, { payload }) => {
	handleUpdateBoardChaosTokenValueInternal(state, payload);
};
