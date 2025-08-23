import {
	selectAutoFailedBy,
	selectAutoSucceedBy,
	selectIsAutoFail,
	selectIsAutoSuccess,
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
		selectIsAutoSuccess,
		selectIsAutoFail,
	],
	(
		currentResult,
		succeedBy,
		failed,
		autoFailedBy,
		autoSucceedBy,
		isAutoSuccess,
		isAutoFail,
	): SkillCheckPickerItem[] => {
		const result = currentResult ?? 0;

		const showValue = !isAutoFail && !isAutoSuccess;

		const rawData = compact([
			failed && {
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
			!failed && {
				type: "fail",
				failed: true,
				succeedBy: autoFailedBy,
				value: 0,
			},
		]) as SkillCheckPickerItem[];

		return uniqWith((a, b) => {
			return a.failed === b.failed && a.succeedBy === b.succeedBy;
		}, rawData);
	},
);
