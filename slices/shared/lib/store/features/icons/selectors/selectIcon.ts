import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectIcons } from "../icons";

export const selectIcon = (code: string) =>
	createSelector([selectIcons], (icons) => icons.find(propEq(code, "icon")));
