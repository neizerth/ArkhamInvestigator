import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { handleOpenRevealChaosTokenModal } from "../handlers";

export const openRevealChaosTokenModal: ChaosBagReducer = (state) => {
	handleOpenRevealChaosTokenModal(state);
};
