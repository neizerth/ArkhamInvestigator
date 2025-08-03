import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import type { SoundQueueItem } from "../../../model";
import { selectSFXWorkers } from "../sound";

const empty: SoundQueueItem[] = [];

export const selectIdleSFXWorkers = createSelector(
	[selectSFXWorkers],
	(workers) => (workers || empty).filter(propEq("idle", "status")),
);
