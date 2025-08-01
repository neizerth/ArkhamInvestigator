import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectSoundQueue } from "../sound";

export const selectSFXWorkerTask = (id: string) =>
	createSelector([selectSoundQueue], (queue) =>
		queue.find(propEq(id, "workerId")),
	);
