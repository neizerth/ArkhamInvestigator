import type { ChaosBagReducer } from "../../../model";
import {
	type HandleCreateChaosBagInternalPayload,
	handleCreateChaosBagInternal,
} from "../handlers";

export const createChaosBagInternal: ChaosBagReducer<
	HandleCreateChaosBagInternalPayload
> = (state, { payload }) => {
	handleCreateChaosBagInternal(state, payload);
};
