import type { AppThunk } from "@shared/model";
import {
	selectInvestigatorCounterEnabled,
	selectInvestigatorSettingsProp,
} from "../../selectors";
import { setInvestigatorSettingsItemByCode } from "./setInvestigatorSettingsItemByCode";

type Options = {
	code: string;
	abilityId: string;
	enabled: boolean | ((value: boolean) => boolean);
};
export const setInvestigatorCounterEnabled =
	({ code, abilityId, ...options }: Options): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const counters = selectInvestigatorSettingsProp(code, "counters")(state);
		const enabled = selectInvestigatorCounterEnabled(code, abilityId)(state);

		const value =
			typeof options.enabled === "function"
				? options.enabled(enabled)
				: options.enabled;

		const data = {
			...counters,
			[abilityId]: value,
		};

		dispatch(setInvestigatorSettingsItemByCode(code, "counters", data));
	};
