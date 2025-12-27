import type {
	SelectedSignature,
	SignatureSelectionHandler,
} from "@modules/signature/selection/shared/model";

export type AddSelectedSignaturePayload = SelectedSignature;
export const handleAddSelectedSignature: SignatureSelectionHandler<
	AddSelectedSignaturePayload
> = (state, payload) => {
	state.selectedSignatures?.push(payload);
};
