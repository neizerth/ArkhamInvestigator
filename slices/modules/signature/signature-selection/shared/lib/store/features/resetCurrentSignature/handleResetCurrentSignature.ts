import type { SignatureSelectionHandler } from "@modules/signature/signature-selection/shared/model";

export const handleResetCurrentSignature: SignatureSelectionHandler = (
	state,
) => {
	state.currentSignatureGroup = null;
	state.currentSignatureId = null;
	state.currentSkinId = null;
};
