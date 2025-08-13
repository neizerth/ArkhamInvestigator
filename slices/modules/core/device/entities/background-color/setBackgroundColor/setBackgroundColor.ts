import { createAction } from "@reduxjs/toolkit";
import type { ColorValue } from "react-native";

type Color = ColorValue | null;

export const setBackgroundColor = createAction<Color>(
	"device/setBackgroundColor",
);

export const backgroundColorSet = createAction<Color>(
	"device/backgroundColorSet",
);
