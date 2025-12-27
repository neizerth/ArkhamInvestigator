import type { SignatureSelectionHandler } from "@modules/signature/selection/shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";

export type SetCurrentSignaturePayload = {
	signatureId: string;
	skinId: string | null;
	group: InvestigatorSignatureGroup;
};

export const handleSetCurrentSignature: SignatureSelectionHandler<
	SetCurrentSignaturePayload
> = (state, payload) => {
	state.currentSignatureGroup = payload.group;
	state.currentSignatureId = payload.signatureId;
	state.currentSkinId = payload.skinId;
};
