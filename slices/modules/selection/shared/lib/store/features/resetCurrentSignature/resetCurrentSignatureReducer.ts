import type { SelectionReducer } from "@modules/selection/shared/model";
import { handleResetCurrentSignature } from "./handleResetCurrentSignature";

export const resetCurrentSignatureReducer: SelectionReducer = (state) => {
	handleResetCurrentSignature(state);
};
