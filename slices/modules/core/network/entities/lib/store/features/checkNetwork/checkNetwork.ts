import type { NetInfoState } from "@react-native-community/netinfo";
import { createAction } from "@reduxjs/toolkit";

export const checkNetwork = createAction("network/checkNetwork");

export const networkChecked = createAction<NetInfoState>(
	"network/checkNetwork",
);
