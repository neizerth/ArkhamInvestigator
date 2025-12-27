import type { SignatureSelectionReducer } from "@modules/signature/selection/shared/model";
import {
	type RemoveSelectedSignatureByCodePayload,
	handleRemoveSelectedSignatureByCode,
} from "./handleRemoveSelectedSignatureByCode";

export const removeSelectedSignatureByCodeReducer: SignatureSelectionReducer<
	RemoveSelectedSignatureByCodePayload
> = (state, { payload }) => {
	handleRemoveSelectedSignatureByCode(state, payload);
};
