import type { SoundQueueItem } from "@modules/core/sound/shared/model";
import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type SoundState = {
	enabled: boolean;
	volume: number;
	queue: SoundQueueItem[];
	sfxWorkers: string[];
};

const initialState: SoundState = {
	enabled: false,
	volume: 10,
	queue: [],
	sfxWorkers: [],
};

export const sound = createSlice({
	name: "sound",
	...createSliceState(initialState),
});

export const {
	setEnabled: setSoundEnabled,
	setVolume: setSoundVolume,
	setQueue: setSoundQueue,
	setSfxWorkers,
} = sound.actions;

export const {
	selectEnabled: selectSoundEnabled,
	selectVolume: selectSoundVolume,
	selectQueue,
	selectSfxWorkers,
} = sound.selectors;

export default sound.reducer;
