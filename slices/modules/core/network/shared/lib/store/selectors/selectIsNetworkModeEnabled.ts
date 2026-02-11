import { createSelector } from "@reduxjs/toolkit";
import {
	selectClientRunning,
	selectHostRunning,
	selectNetworkRole,
} from "../network";

export const selectIsNetworkModeEnabled = createSelector(
	[selectNetworkRole, selectHostRunning, selectClientRunning],
	(networkRole, hostRunning, clientRunning) => {
		if (networkRole === "host") {
			return hostRunning;
		}
		if (networkRole === "client") {
			return clientRunning;
		}
		return false;
	},
);
