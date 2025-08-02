import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import type { SoundQueueItem } from "../../../model";
import { selectSoundQueue } from "../sound";

const empty: SoundQueueItem[] = [];

export const selectIdleSFXWorkers = createSelector(
	[selectSoundQueue],
	(workers) => (workers || empty).filter(propEq("idle", "status")),
);
