import { createAction } from "@reduxjs/toolkit";
import type { AppStateStatus } from "react-native";

export const deviceAppStateChanged = createAction<AppStateStatus>(
	"device/appStatusChanged",
);
