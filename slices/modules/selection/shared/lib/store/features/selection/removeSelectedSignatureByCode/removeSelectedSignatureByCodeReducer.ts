import type { SelectionReducer } from "@modules/selection/shared/model";
import {
	type RemoveSelectedSignatureByCodePayload,
	handleRemoveSelectedSignatureByCode,
} from "./handleRemoveSelectedSignatureByCode";

export const removeSelectedSignatureByCodeReducer: SelectionReducer<
	RemoveSelectedSignatureByCodePayload
> = (state, { payload }) => {
	handleRemoveSelectedSignatureByCode(state, payload);
};
