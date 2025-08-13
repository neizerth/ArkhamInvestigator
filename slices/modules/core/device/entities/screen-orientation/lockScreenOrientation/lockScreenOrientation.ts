import { createAction } from "@reduxjs/toolkit";
import type { OrientationLock } from "expo-screen-orientation";

export const lockScreenOrientation = createAction<OrientationLock>(
	"device/lockScreenOrientation",
);

export const screenOrientationLocked = createAction<OrientationLock>(
	"device/screenOrientationLocked",
);
