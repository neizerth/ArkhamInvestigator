import { createSelector } from "@reduxjs/toolkit";
import type { ChaosTokenType } from "../../../../../../model";
import { selectChaosTokenValue } from "../../chaosBag";
import {
	selectInvestigatorDefaultTokenValues,
	selectReferenceDefaultTokenValues,
} from "../reference";
import { selectInvestigatorChaosTokenValuesByCode } from "./selectInvestigatorChaosTokenValuesByCode";

type Options = {
	code?: string;
	type: ChaosTokenType;
};

export const selectChaosTokenValueByType = ({ type, code }: Options) =>
	createSelector(
		[
			selectReferenceDefaultTokenValues,
			selectInvestigatorDefaultTokenValues,
			selectChaosTokenValue,
			selectInvestigatorChaosTokenValuesByCode(code),
		],
		(defaultValues, defaultInvestigatorValues, values, investigatorValues) => {
			const data = {
				...defaultValues,
				...defaultInvestigatorValues,
				...(values || {}),
				...(investigatorValues || {}),
			};

			return data[type] || 0;
		},
	);
