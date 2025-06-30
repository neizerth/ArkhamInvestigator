import type { ChaosBagReducer } from "../../../model";
import {
	type HandleRemoveChaosTokenByTypeInternalPayload,
	handleRemoveChaosTokenByTypeInternal,
} from "../handlers";

export const removeChaosTokenByTypeInternal: ChaosBagReducer<
	HandleRemoveChaosTokenByTypeInternalPayload
> = (state, { payload }) => {
	handleRemoveChaosTokenByTypeInternal(state, payload);
};
