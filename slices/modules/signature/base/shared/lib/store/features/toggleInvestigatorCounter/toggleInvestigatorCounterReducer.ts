import type { SignatureReducer } from "@modules/signature/base/shared/model";
import {
	type ToggleInvestigatorCounterPayload,
	handleToggleInvestigatorCounter,
} from "./handleToggleInvestigatorCounter";

export const toggleInvestigatorCounterReducer: SignatureReducer<
	ToggleInvestigatorCounterPayload
> = (state, { payload }) => {
	handleToggleInvestigatorCounter(state, payload);
};
