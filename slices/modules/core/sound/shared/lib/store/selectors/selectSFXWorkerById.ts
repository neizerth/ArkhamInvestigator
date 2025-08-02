import { createSelector } from "@reduxjs/toolkit";
import type { SFXWorkerInfo } from "../../../model";
import { getSFXWorkerByid } from "../getters";
import { selectSFXWorkers } from "../sound";

const empty: SFXWorkerInfo[] = [];

export const selectSFXWorkerById = (id: string) =>
	createSelector([selectSFXWorkers], (workers) =>
		getSFXWorkerByid({ sfxWorkers: workers || empty, id }),
	);
