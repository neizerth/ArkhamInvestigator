import { createSelector } from "@reduxjs/toolkit";
import { selectIcons } from "../icons";

export const selectIcon = (code: string) =>
	createSelector([selectIcons], (icons) => icons[code]);
