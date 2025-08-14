import { createSlice } from "@reduxjs/toolkit";
import { createSliceState } from "redux-toolkit-helpers";
import type { TimingPhaseId } from "../../model";
import * as reducers from "./features/reducers";

export type RoundTimingState = {
	openTimingPhases?: number[];
	timingWizardStepIndex: number | null;
	timingWizardPhaseId: TimingPhaseId | null;
};

const initialState: RoundTimingState = {
	openTimingPhases: [],
	timingWizardStepIndex: null,
	timingWizardPhaseId: null,
};

const state = createSliceState(initialState);

export const roundTiming = createSlice({
	name: "roundTiming",
	...state,
	reducers: {
		...state.reducers,
		...reducers,
	},
});

export const {
	setOpenTimingPhases,
	setTimingWizardStepIndex,
	setTimingWizardPhaseId,

	openTimingPhase,
	closeTimingPhase,
	startTimingWizard,
} = roundTiming.actions;

export const {
	selectOpenTimingPhases,
	selectTimingWizardStepIndex,
	selectTimingWizardPhaseId,
} = roundTiming.selectors;

export default roundTiming.reducer;
