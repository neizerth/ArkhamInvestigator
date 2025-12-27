import type { SignatureSelectionReducer } from "@modules/signature/selection/shared/model";
import {
	type AddSelectedSignaturePayload,
	handleAddSelectedSignature,
} from "./handleAddSelectedSignature";

export const addSelectedSignatureReducer: SignatureSelectionReducer<
	AddSelectedSignaturePayload
> = (state, { payload }) => {
	handleAddSelectedSignature(state, payload);
};
