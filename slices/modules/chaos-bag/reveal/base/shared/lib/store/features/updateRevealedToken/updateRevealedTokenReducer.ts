import type { ChaosBagRevealReducer } from "../../../../model";
import {
	type HandleUpdateRevealedTokenPayload,
	handleUpdateRevealedToken,
} from "./handleUpdateRevealedToken";

export const updateRevealedTokenReducer: ChaosBagRevealReducer<
	HandleUpdateRevealedTokenPayload
> = (state, { payload }) => {
	handleUpdateRevealedToken(state, payload);
};
