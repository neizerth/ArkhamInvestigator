import type { SignatureReducer } from "@modules/signature/shared/model";
import {
	type SetInvestigatorCounterEnabledPayload,
	handleSetInvestigatorCounterEnabled,
} from "./handleSetInvestigatorCounterEnabled";

export const setInvestigatorCounterEnabledReducer: SignatureReducer<
	SetInvestigatorCounterEnabledPayload
> = (state, { payload }) => {
	handleSetInvestigatorCounterEnabled(state, payload);
};
