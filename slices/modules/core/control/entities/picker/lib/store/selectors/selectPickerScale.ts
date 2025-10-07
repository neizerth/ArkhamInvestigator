import { createSelector } from "@reduxjs/toolkit";
import { pickerScaleMap } from "../../../config";
import { selectPickerSize } from "../picker";

export const selectPickerScale = createSelector(
	[selectPickerSize],
	(size) => pickerScaleMap[size],
);
