import type { SignatureSelectionReducer } from "@modules/signature/selection/shared/model";
import {
	type SetCurrentSignaturePayload,
	handleSetCurrentSignature,
} from "./handleSetCurrentSignature";

export const setCurrentSignatureReducer: SignatureSelectionReducer<
	SetCurrentSignaturePayload
> = (state, { payload }) => {
	handleSetCurrentSignature(state, payload);
};
