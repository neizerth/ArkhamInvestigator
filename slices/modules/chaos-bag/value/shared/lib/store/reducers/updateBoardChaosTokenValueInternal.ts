import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import {
	type HandleUpdateBoardChaosTokenValueInternalPayload,
	handleUpdateBoardChaosTokenValueInternal,
} from "../handlers";

export const updateBoardChaosTokenValueInternal: ChaosBagReducer<
	HandleUpdateBoardChaosTokenValueInternalPayload
> = (state, { payload }) => {
	handleUpdateBoardChaosTokenValueInternal(state, payload);
};
