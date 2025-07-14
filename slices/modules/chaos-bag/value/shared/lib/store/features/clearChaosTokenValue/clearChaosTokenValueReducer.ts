import type { ChaosTokenValueReducer } from "@modules/chaos-bag/value/shared/model";
import { handleClearChaosTokenValue } from "./handleClearChaosTokenValue";

export const clearChaosTokenValueReducer: ChaosTokenValueReducer = (state) => {
	handleClearChaosTokenValue(state);
};
