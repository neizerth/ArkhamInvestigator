import type { SelectionReducer } from "@modules/selection/shared/model";
import { handleClearSelectedSignatures } from "./handleClearSelectedSignatures";

export const clearSelectedSignaturesReducer: SelectionReducer = (state) => {
	handleClearSelectedSignatures(state);
};
