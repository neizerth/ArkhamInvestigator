import { createAction } from "@reduxjs/toolkit";

import type { NavigationBarStyle } from "expo-navigation-bar";

export const setNavigationBarStyle = createAction<NavigationBarStyle>(
	"navigationBar/setStyle",
);
