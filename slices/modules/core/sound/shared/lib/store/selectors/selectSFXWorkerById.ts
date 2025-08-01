import { createSelector } from "@reduxjs/toolkit";
import { getSFXWorkerByid } from "../getters";
import { selectSFXWorkers } from "../sound";

export const selectSFXWorkerById = (id: string) =>
	createSelector([selectSFXWorkers], (sfxWorkers) =>
		getSFXWorkerByid({ sfxWorkers, id }),
	);
