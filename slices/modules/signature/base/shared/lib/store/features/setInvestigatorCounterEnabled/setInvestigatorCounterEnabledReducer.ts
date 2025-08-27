import type { SignatureReducer } from "@modules/signature/base/shared/model";
import {
	type SetInvestigatorCounterEnabledPayload,
	handleSetInvestigatorCounterEnabled,
} from "./handleSetInvestigatorCounterEnabled";

export const setInvestigatorCounterEnabledReducer: SignatureReducer<
	SetInvestigatorCounterEnabledPayload
> = (state, { payload }) => {
	handleSetInvestigatorCounterEnabled(state, payload);
};
