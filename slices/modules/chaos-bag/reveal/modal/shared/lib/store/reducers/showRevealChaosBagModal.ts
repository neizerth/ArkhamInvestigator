import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { handleShowRevealChaosBagModal } from "../handlers";

export const showRevealChaosBagModal: ChaosBagReducer = (state) => {
	handleShowRevealChaosBagModal(state);
};
