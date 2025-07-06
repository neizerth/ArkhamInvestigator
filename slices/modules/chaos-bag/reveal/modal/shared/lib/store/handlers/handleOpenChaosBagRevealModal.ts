import type { ChaosBagRevealModalHandler } from "../../../model";

export const handleOpenChaosBagRevealModal: ChaosBagRevealModalHandler = (
	state,
) => {
	state.showRevealModal = true;
};
