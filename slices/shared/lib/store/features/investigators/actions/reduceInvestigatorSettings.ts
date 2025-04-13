import type { AppThunk, InvestigatorSettings } from "@shared/model";
import { selectInvestigatorSettings } from "../investigators";
import { setInvestigatorSettingsByCode } from "./setInvestigatorSettingsByCode";

type Options<T extends keyof InvestigatorSettings> = {
	code: string;
	prop: T;
	reducer: (value: InvestigatorSettings[T]) => InvestigatorSettings[T];
};

export const reduceInvestigatorSettings =
	<T extends keyof InvestigatorSettings>({
		code,
		prop,
		reducer,
	}: Options<T>): AppThunk =>
	(dispatch, getState) => {
		const state = getState();

		const settings = selectInvestigatorSettings(state);

		const investigatorSettings = settings?.[code] || {};

		const currentValue = investigatorSettings?.[prop];

		const value = reducer(currentValue);

		const nextSettings = {
			...investigatorSettings,
			[prop]: value,
		};

		dispatch(setInvestigatorSettingsByCode(code, nextSettings));
	};
