import { createSelector } from "@reduxjs/toolkit";
import type { ChaosTokenType } from "../../../../../../model";
import { selectChaosTokenValue } from "../../chaosBag";
import { selectInvestigatorChaosTokenValuesByCode } from "./selectInvestigatorChaosTokenValuesByCode";

type Options = {
	code?: string;
	type: ChaosTokenType;
};

export const selectChaosTokenValueByType = ({ type, code }: Options) =>
	createSelector(
		[selectChaosTokenValue, selectInvestigatorChaosTokenValuesByCode(code)],
		(values, investigatorValues) => {
			if (!values && !investigatorValues) {
				return 0;
			}

			const data = {
				...(values || {}),
				...investigatorValues,
			};

			return data[type] || 0;
		},
	);
