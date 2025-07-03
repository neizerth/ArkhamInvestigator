import type { ChaosBagReducer } from "../../../model";
import {
	type HandleRemoveChaosTokenInternalPayload,
	handleRemoveChaosTokenInternal,
} from "../handlers";

export const removeChaosTokenInternal: ChaosBagReducer<
	HandleRemoveChaosTokenInternalPayload
> = (state, { payload }) => {
	handleRemoveChaosTokenInternal(state, payload);
};
