import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import {
	type SetChaosBagContentsPayload,
	handleSetChaosBagContents,
} from "./handleSetChaosBagContents";

export const setChaosBagContentsReducer: ChaosBagReducer<
	SetChaosBagContentsPayload
> = (state, { payload }) => {
	handleSetChaosBagContents(state, payload);
};
