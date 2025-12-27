import type {
	SelectedSignature,
	SelectionHandler,
} from "@modules/selection/shared/model";

export type AddSelectedSignaturePayload = SelectedSignature;
export const handleAddSelectedSignature: SelectionHandler<
	AddSelectedSignaturePayload
> = (state, payload) => {
	state.selectedSignatures?.push(payload);
};
