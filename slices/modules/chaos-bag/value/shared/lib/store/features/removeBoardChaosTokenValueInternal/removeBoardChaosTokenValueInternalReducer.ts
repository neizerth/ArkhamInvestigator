import type { ChaosTokenValueReducer } from "../../../../model";
import {
	type RemoveBoardChaosTokenValueInternalPayload,
	handleRemoveBoardChaosTokenValueInternal,
} from "./handleRemoveBoardChaosTokenValueInternal";

export const removeBoardChaosTokenValueInternalReducer: ChaosTokenValueReducer<
	RemoveBoardChaosTokenValueInternalPayload
> = (state, { payload }) => {
	handleRemoveBoardChaosTokenValueInternal(state, payload);
};
