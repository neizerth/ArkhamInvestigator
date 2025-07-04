import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { handleCancelShowRevealModal } from "../handlers";

export const cancelShowRevealModal: ChaosBagReducer = (state) => {
	handleCancelShowRevealModal(state);
};
