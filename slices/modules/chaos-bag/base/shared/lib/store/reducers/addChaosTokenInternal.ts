import type { ChaosBagToken } from "../../../model";
import type { ChaosBagReducer } from "../../../model/store";
import { handleAddChaosTokenInternal } from "../handlers/handleAddChaosTokenInternal";

export const addChaosTokenInternal: ChaosBagReducer<ChaosBagToken> = (
	state,
	{ payload },
) => {
	handleAddChaosTokenInternal(state, payload);
};
