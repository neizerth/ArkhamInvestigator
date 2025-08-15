import type { InvestigatorSettings } from "@modules/signature/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SignatureState } from "../../signature";
import {
	type SetInvestigatorSettingsPropPayload,
	handleSetInvestigatorSettingsProp,
} from "./handleSetInvestigatorSettingsItemByCode";

type Action<T extends keyof InvestigatorSettings> = PayloadAction<
	SetInvestigatorSettingsPropPayload<T>
>;
export function setInvestigatorSettingsPropReducer<
	T extends keyof InvestigatorSettings,
>(state: SignatureState, { payload }: Action<T>) {
	handleSetInvestigatorSettingsProp(state, payload);
}
