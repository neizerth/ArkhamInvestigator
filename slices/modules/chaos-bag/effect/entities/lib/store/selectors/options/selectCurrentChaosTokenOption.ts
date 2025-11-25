import { createSelector } from "@reduxjs/toolkit";
import { isNumber } from "ramda-adjunct";
import { selectReferenceCardChaosTokenOptions } from "./selectChaosBagOptions";
import {
	type SelectCurrentChaosTokenOptionIndexOptions,
	selectCurrentChaosTokenOptionIndex,
} from "./selectCurrentChaosTokenOptionIndex";

export const selectCurrentChaosTokenOption = (
	options: SelectCurrentChaosTokenOptionIndexOptions,
) =>
	createSelector(
		[
			selectCurrentChaosTokenOptionIndex(options),
			selectReferenceCardChaosTokenOptions(options.type),
		],
		(index, options) => {
			if (!isNumber(index)) {
				return;
			}

			return options[index];
		},
	);
