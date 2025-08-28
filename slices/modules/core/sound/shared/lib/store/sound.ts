import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";

export type SoundState = {
	enabled: boolean;
	volume: number;
};

const initialState: SoundState = {
	enabled: false,
	volume: 10,
};

const state = createSliceState(initialState);

export const sound = createSlice({
	name: "sound",
	...state,
});

export const { setEnabled: setSoundEnabled, setVolume: setSoundVolume } =
	sound.actions;

export const {
	selectEnabled: selectSoundEnabled,
	selectVolume: selectSoundVolume,
} = sound.selectors;

export default sound.reducer;
