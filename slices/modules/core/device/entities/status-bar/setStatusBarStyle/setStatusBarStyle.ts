import { createAction } from "@reduxjs/toolkit";
import type { SystemBarsProps } from "react-native-edge-to-edge";

type Payload = SystemBarsProps["style"];

export const setStatusBarStyle = createAction<Payload>(
	"device/setStatusBarStyle",
);
