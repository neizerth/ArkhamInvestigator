import type { SelectionReducer } from "@modules/selection/shared/model";
import {
	type SetCurrentSignaturePayload,
	handleSetCurrentSignature,
} from "./handleSetCurrentSignature";

export const setCurrentSignatureReducer: SelectionReducer<
	SetCurrentSignaturePayload
> = (state, { payload }) => {
	handleSetCurrentSignature(state, payload);
};
