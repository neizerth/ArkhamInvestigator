import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { handleCloseRevealChaosBagModal } from "../handlers";

export const closeRevealChaosBagModal: ChaosBagReducer = (state) => {
	handleCloseRevealChaosBagModal(state);
};
