import type { SelectionHandler } from "@modules/selection/shared/model";

export const handleResetCurrentSignature: SelectionHandler = (state) => {
	state.currentSignatureGroup = null;
	state.currentSignatureId = null;
	state.currentSkinId = null;
};
