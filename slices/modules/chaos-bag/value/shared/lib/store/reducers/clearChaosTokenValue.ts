import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { handleClearChaosTokenValue } from "../handlers";

export const clearChaosTokenValue: ChaosBagReducer = (state) => {
	handleClearChaosTokenValue(state);
};
