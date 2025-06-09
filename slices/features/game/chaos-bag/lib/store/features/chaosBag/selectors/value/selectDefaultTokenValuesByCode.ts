import { createSelector } from "@reduxjs/toolkit";
import { getInvestigatorSpecialTokenValues } from "../../../../../tokens";
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
			const specialValues = getInvestigatorSpecialTokenValues(code);
			return {
				...defaultValues,
				...defaultInvestigatorValues,
				...(elderSignValue || {}),
				...(values || {}),
				...(investigatorValues || {}),
				...specialValues,
			};
		},
	);
