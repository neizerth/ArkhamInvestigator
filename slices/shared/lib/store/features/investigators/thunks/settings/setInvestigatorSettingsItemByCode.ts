import type { AppThunk, InvestigatorSettings } from "@shared/model";
import { selectInvestigatorSettings } from "../../investigators";
import { setInvestigatorSettingsByCode } from "./setInvestigatorSettingsByCode";

export const setInvestigatorSettingsItemByCode =
	<T extends keyof InvestigatorSettings>(
		code: string,
		name: T,
		value: InvestigatorSettings[T],
	): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const config = selectInvestigatorSettings(state) || {};
		const investigatorConfig = config[code] || {};

		const data = {
			...investigatorConfig,
			[name]: value,
		};

		dispatch(setInvestigatorSettingsByCode(code, data));
	};
