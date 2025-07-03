import type { ChaosBagReducer } from "../../../model";
import {
	type HandleRemoveChaosTokenByIdPayload,
	handleRemoveChaosTokenById,
} from "../handlers";

export const removeChaosTokenById: ChaosBagReducer<
	HandleRemoveChaosTokenByIdPayload
> = (state, { payload }) => {
	handleRemoveChaosTokenById(state, payload);
};
