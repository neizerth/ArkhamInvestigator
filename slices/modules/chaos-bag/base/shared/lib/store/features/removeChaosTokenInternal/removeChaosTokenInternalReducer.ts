import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import {
	type HandleRemoveChaosTokenInternalPayload,
	handleRemoveChaosTokenInternal,
} from "./handleRemoveChaosTokenInternal";

export const removeChaosTokenInternalReducer: ChaosBagReducer<
	HandleRemoveChaosTokenInternalPayload
> = (state, { payload }) => {
	handleRemoveChaosTokenInternal(state, payload);
};
