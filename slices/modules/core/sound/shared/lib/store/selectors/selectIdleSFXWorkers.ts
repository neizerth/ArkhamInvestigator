import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectSoundQueue } from "../sound";

export const selectIdleSFXWorkers = createSelector(
	[selectSoundQueue],
	(workers) => workers.filter(propEq("idle", "status")),
);
