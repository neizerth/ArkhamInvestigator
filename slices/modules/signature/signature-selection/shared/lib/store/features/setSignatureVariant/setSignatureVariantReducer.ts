import type { SignatureSelectionReducer } from "@modules/signature/signature-selection/shared/model";
import {
	type SetSignatureVariantPayload,
	handleSetSignatureVariant,
} from "./handleSetSignatureVariant";

export const setSignatureVariantReducer: SignatureSelectionReducer<
	SetSignatureVariantPayload
> = (state, { payload }) => {
	handleSetSignatureVariant(state, payload);
};
