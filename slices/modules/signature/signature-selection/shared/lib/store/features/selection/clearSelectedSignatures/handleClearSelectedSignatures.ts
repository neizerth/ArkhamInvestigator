import type { SignatureSelectionHandler } from "@modules/signature/signature-selection/shared/model";

export const handleClearSelectedSignatures: SignatureSelectionHandler = (
	state,
) => {
	state.selectedSignatures = [];
	state.replaceSignature = false;
	state.currentSignatureGroup = null;
	state.currentSignatureId = null;
	state.currentSkinId = null;
};
