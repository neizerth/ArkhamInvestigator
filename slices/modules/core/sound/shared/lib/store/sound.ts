import type {
	SFXWorkerInfo,
	SoundQueueItem,
} from "@modules/core/sound/shared/model";
import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import * as reducers from "./reducers";

export type SoundState = {
	enabled: boolean;
	volume: number;
	queue: SoundQueueItem[];
	sfxWorkers: SFXWorkerInfo[];
};

const initialState: SoundState = {
	enabled: false,
	volume: 10,
	queue: [],
	sfxWorkers: [],
};

const state = createSliceState(initialState);

export const sound = createSlice({
	name: "sound",
	...state,
	reducers: {
		...state.reducers,
		...reducers,
	},
});

export const {
	setEnabled: setSoundEnabled,
	setVolume: setSoundVolume,
	setQueue: setSoundQueue,
	setSfxWorkers,

	registerSFXWorker,
	unregisterSFXWorker,

	addSoundQueueItem,
	removeSoundQueueItem,
	updateSoundQueueItem,
} = sound.actions;

export const {
	selectEnabled: selectSoundEnabled,
	selectVolume: selectSoundVolume,
	selectQueue: selectSoundQueue,
	selectSfxWorkers: selectSFXWorkers,
} = sound.selectors;

export default sound.reducer;
