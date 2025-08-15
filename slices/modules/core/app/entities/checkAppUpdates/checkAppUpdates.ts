import { createAction } from "@reduxjs/toolkit";
import type { BuildInfo } from "arkham-investigator-data";

export const checkAppUpdates = createAction("app/checkUpdates");

export const appUpdatesChecked = createAction<BuildInfo>("app/updatesChecked");
