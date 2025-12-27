import type { SignatureSelectionReducer } from "@modules/signature/signature-selection/shared/model";
import { handleResetCurrentSignature } from "./handleResetCurrentSignature";

export const resetCurrentSignatureReducer: SignatureSelectionReducer = (
	state,
) => {
	handleResetCurrentSignature(state);
};
