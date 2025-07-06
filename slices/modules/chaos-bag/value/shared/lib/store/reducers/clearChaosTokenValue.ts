import type { ChaosTokenValueReducer } from "../../../model";
import { handleClearChaosTokenValue } from "../handlers";

export const clearChaosTokenValue: ChaosTokenValueReducer = (state) => {
	handleClearChaosTokenValue(state);
};
