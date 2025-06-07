import { createSelector } from "@reduxjs/toolkit";
import type { ChaosTokenType } from "../../../../../../model";
import { selectChaosTokenValue } from "../../../chaosBag/chaosBag";
import {
	selectInvestigatorDefaultTokenValues,
	selectInvestigatorElderSignValue,
} from "../reference/investigator";
import { selectReferenceDefaultTokenValues } from "../reference/selectReferenceDefaultTokenValues";
import { selectInvestigatorChaosTokenValuesByCode } from "./selectInvestigatorChaosTokenValuesByCode";

type Options = {
	code: string;
	type: ChaosTokenType;
};

export const selectChaosTokenValueByType = ({ type, code }: Options) =>
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
			const data = {
				...defaultValues,
				...defaultInvestigatorValues,
				...(elderSignValue || {}),
				...(values || {}),
				...(investigatorValues || {}),
			};

			return data[type] || 0;
		},
	);
