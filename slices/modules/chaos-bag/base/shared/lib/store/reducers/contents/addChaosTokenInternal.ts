import type { ChaosBagReducer, ChaosBagToken } from "../../../../model";
import { handleAddChaosTokenInternal } from "../../handlers";

export const addChaosTokenInternal: ChaosBagReducer<ChaosBagToken> = (
	state,
	{ payload },
) => {
	handleAddChaosTokenInternal(state, payload);
};
