import type { ChaosBagRevealModalReducer } from "../../../model";
import { handleOpenChaosBagRevealModal } from "../handlers";

export const openChaosBagRevealModal: ChaosBagRevealModalReducer = (state) => {
	handleOpenChaosBagRevealModal(state);
};
