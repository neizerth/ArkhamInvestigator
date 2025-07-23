import type { ChaosBagRevealReducer } from "../../../../model";
import {
	type HandleSetRevealedTokenValuePayload,
	handleSetRevealedTokenValue,
} from "./handleSetRevealedTokenValue";

export const setRevealedTokenValueReducer: ChaosBagRevealReducer<
	HandleSetRevealedTokenValuePayload
> = (state, { payload }) => {
	handleSetRevealedTokenValue(state, payload);
};
