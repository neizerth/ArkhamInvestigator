import { createSelector } from "@reduxjs/toolkit";
import type { ChaosTokenType } from "../../../../../../model";
import { selectChaosTokenValue } from "../../chaosBag";
import { selectReferenceDefaultTokenValues } from "../reference";
import { selectInvestigatorChaosTokenValuesByCode } from "./selectInvestigatorChaosTokenValuesByCode";

type Options = {
	code?: string;
	type: ChaosTokenType;
};

export const selectChaosTokenValueByType = ({ type, code }: Options) =>
	createSelector(
		[
			selectReferenceDefaultTokenValues,
			selectChaosTokenValue,
			selectInvestigatorChaosTokenValuesByCode(code),
		],
		(defaultValues, values, investigatorValues) => {
			const data = {
				...defaultValues,
				...(values || {}),
				...(investigatorValues || {}),
			};

			return data[type] || 0;
		},
	);
