import type { SelectionReducer } from "@modules/selection/shared/model";
import {
	type SetSignatureVariantPayload,
	handleSetSignatureVariant,
} from "./handleSetSignatureVariant";

export const setSignatureVariantReducer: SelectionReducer<
	SetSignatureVariantPayload
> = (state, { payload }) => {
	handleSetSignatureVariant(state, payload);
};
