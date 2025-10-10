import { createAction } from "@reduxjs/toolkit";
import type { BuildInfo } from "arkham-investigator-data";

type CheckAppUpdatesPayload = {
	notify: boolean;
};

export const checkAppUpdates =
	createAction<CheckAppUpdatesPayload>("app/checkUpdates");

export const appUpdatesChecked = createAction<BuildInfo>("app/updatesChecked");
