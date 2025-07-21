import type {
	ChaosBagReducer,
	ChaosBagToken,
} from "@modules/chaos-bag/base/shared/model";
import { handleAddChaosTokenInternal } from "./handleAddChaosTokenInternal";

export const addChaosTokenInternalReducer: ChaosBagReducer<ChaosBagToken> = (
	state,
	{ payload },
) => {
	handleAddChaosTokenInternal(state, payload);
};
