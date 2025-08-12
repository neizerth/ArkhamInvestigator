import type { ChaosBagRevealReducer } from "../../../../model";
import {
	type HandleUpdateRevealedTokenInternalPayload,
	handleUpdateRevealedTokenInternal,
} from "./handleUpdateRevealedTokenInternal";

export const updateRevealedTokenInternalReducer: ChaosBagRevealReducer<
	HandleUpdateRevealedTokenInternalPayload
> = (state, { payload }) => {
	handleUpdateRevealedTokenInternal(state, payload);
};
