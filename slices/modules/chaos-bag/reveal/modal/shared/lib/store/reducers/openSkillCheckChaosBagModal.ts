import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import {
	type HandleOpenSkillCheckChaosBagModalPayload,
	handleOpenSkillCheckChaosBagModal,
} from "../handlers";

export const openSkillCheckChaosBagModal: ChaosBagReducer<
	HandleOpenSkillCheckChaosBagModalPayload
> = (state, { payload }) => {
	handleOpenSkillCheckChaosBagModal(state, payload);
};
