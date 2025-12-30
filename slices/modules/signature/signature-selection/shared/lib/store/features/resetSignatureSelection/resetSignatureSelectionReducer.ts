import type { SignatureSelectionReducer } from "@modules/signature/signature-selection/shared/model";
import { handleResetSignatureSelection } from "./handleResetSignatureSelection";

export const resetSignatureSelectionReducer: SignatureSelectionReducer = (
	state,
) => {
	handleResetSignatureSelection(state);
};
