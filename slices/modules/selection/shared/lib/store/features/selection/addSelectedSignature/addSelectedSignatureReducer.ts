import type { SelectionReducer } from "@modules/selection/shared/model";
import {
	type AddSelectedSignaturePayload,
	handleAddSelectedSignature,
} from "./handleAddSelectedSignature";

export const addSelectedSignatureReducer: SelectionReducer<
	AddSelectedSignaturePayload
> = (state, { payload }) => {
	handleAddSelectedSignature(state, payload);
};
