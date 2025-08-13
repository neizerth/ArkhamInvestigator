import { createAction } from "@reduxjs/toolkit";

import type { OrientationLock } from "expo-screen-orientation";

export const screenOrientationLocked = createAction<OrientationLock>(
	"device/screenOrientationLocked",
);
