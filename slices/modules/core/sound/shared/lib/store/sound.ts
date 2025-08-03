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
	queue: SoundQueueItem[] | null;
	sfxWorkers: SFXWorkerInfo[] | null;
};

const initialState: SoundState = {
	enabled: false,
	volume: 10,
	queue: null,
	sfxWorkers: null,
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

	registerSFXWorkers,
	updateSFXWorker,

	addSoundQueueItem,
	removeSoundQueueItem,
	updateSoundQueueItem,
	clearSoundQueue,
} = sound.actions;

export const {
	selectEnabled: selectSoundEnabled,
	selectVolume: selectSoundVolume,
	selectQueue: selectSoundQueue,
	selectSfxWorkers: selectSFXWorkers,
} = sound.selectors;

export default sound.reducer;
