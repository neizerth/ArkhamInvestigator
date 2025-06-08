import { createSelector } from "@reduxjs/toolkit";
import { selectChaosTokenValue } from "../../chaosBag";
import {
	selectInvestigatorDefaultTokenValues,
	selectInvestigatorElderSignValue,
	selectReferenceDefaultTokenValues,
} from "../reference";
import { selectInvestigatorChaosTokenValuesByCode } from "./selectInvestigatorChaosTokenValuesByCode";

export const selectDefaultTokenValuesByCode = (code: string) =>
	createSelector(
		[
			selectReferenceDefaultTokenValues,
			selectInvestigatorDefaultTokenValues(code),
			selectInvestigatorElderSignValue(code),
			selectChaosTokenValue,
			selectInvestigatorChaosTokenValuesByCode(code),
		],
		(
			defaultValues,
			defaultInvestigatorValues,
			elderSignValue,
			values,
			investigatorValues,
		) => {
			return {
				...defaultValues,
				...defaultInvestigatorValues,
				...(elderSignValue || {}),
				...(values || {}),
				...(investigatorValues || {}),
			};
		},
	);
