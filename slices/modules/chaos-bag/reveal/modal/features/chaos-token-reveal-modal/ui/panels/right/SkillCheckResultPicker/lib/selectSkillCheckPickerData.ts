import {
	selectAutoFailedBy,
	selectAutoSucceedBy,
	selectIsSkillCheckFailed,
	selectSkillCheckResult,
	selectSkillCheckSucceedBy,
} from "@modules/chaos-bag/result/entities/lib";
import { createSelector } from "@reduxjs/toolkit";
import { uniqWith } from "ramda";
import { compact } from "ramda-adjunct";
import type { SkillCheckPickerItem } from "../model";

export const selectSkillCheckData = createSelector(
	[
		selectSkillCheckResult,
		selectSkillCheckSucceedBy,
		selectIsSkillCheckFailed,
		selectAutoFailedBy,
		selectAutoSucceedBy,
	],
	(
		currentResult,
		succeedBy,
		failed,
		autoFailedBy,
		autoSucceedBy,
	): SkillCheckPickerItem[] => {
		const result = currentResult ?? 0;

		const rawData = compact<SkillCheckPickerItem>([
			{
				type: "success",
				succeedBy: autoSucceedBy,
				value: result,
				failed: false,
			},
			{
				type: "value",
				failed,
				succeedBy,
				value: result,
			},
			{
				type: "fail",
				failed: true,
				succeedBy: autoFailedBy,
				value: 0,
			},
		]);

		return uniqWith((a, b) => {
			return a.failed === b.failed && a.succeedBy === b.succeedBy;
		}, rawData);
	},
);
