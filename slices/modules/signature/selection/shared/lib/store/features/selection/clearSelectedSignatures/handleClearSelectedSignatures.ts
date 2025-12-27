import type { SignatureSelectionHandler } from "@modules/signature/selection/shared/model";

export const handleClearSelectedSignatures: SignatureSelectionHandler = (
	state,
) => {
	state.selectedSignatures = [];
};
