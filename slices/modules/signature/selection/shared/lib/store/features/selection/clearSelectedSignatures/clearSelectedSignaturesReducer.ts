import type { SignatureSelectionReducer } from "@modules/signature/selection/shared/model";
import { handleClearSelectedSignatures } from "./handleClearSelectedSignatures";

export const clearSelectedSignaturesReducer: SignatureSelectionReducer = (
	state,
) => {
	handleClearSelectedSignatures(state);
};
