import type { SignatureReducer } from "@modules/signature/shared/model";
import {
	type SetInvestigatorSettingsByCodePayload,
	handleSetInvestigatorSettingsByCode,
} from "./handleSetInvestigatorSettingsByCode";

export const setInvestigatorSettingsByCodeReducer: SignatureReducer<
	SetInvestigatorSettingsByCodePayload
> = (state, { payload }) => {
	handleSetInvestigatorSettingsByCode(state, payload);
};
