import type { RootState } from "@shared/model";
import type { InvestigatorSettings } from "@shared/model";
import { selectInvestigatorSettingsByCode } from "./selectInvestigatorSettingsByCode";

export const selectInvestigatorSettingsProp =
	<T extends keyof InvestigatorSettings>(
		code: string,
		prop: T,
		defaultValue?: InvestigatorSettings[T],
	) =>
	(state: RootState) => {
		const settings = selectInvestigatorSettingsByCode(code)(state);
		return settings?.[prop] || defaultValue;
	};
