import { createAction } from "@reduxjs/toolkit";
import type { Service } from "react-native-zeroconf";

export const setZeroconfService = createAction<Service>(
	"multiplayer/setZeroconfService",
);
