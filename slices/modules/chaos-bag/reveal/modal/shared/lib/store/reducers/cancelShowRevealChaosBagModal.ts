import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { handleCancelShowRevealChaosBagModal } from "../handlers";

export const cancelShowRevealChaosBagModal: ChaosBagReducer = (state) => {
	handleCancelShowRevealChaosBagModal(state);
};
