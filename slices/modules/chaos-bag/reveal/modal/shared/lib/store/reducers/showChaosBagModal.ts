import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { handleShowRevealChaosTokenModal } from "../handlers";

export const showChaosBagModal: ChaosBagReducer = (state) => {
	handleShowRevealChaosTokenModal(state);
};
