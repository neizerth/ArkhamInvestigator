import { createRemoteReducer } from "@modules/core/network/shared/lib";
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

const stateReducers = {
	...state.reducers,
	...reducers,
};

export const roundTiming = createSlice({
	name: "roundTiming",
	...state,
	reducers: {
		...stateReducers,
		setOpenTimingPhases: createRemoteReducer(
			stateReducers.setOpenTimingPhases,
			{
				notify: "all",
			},
		),
		setTimingWizardStepIndex: createRemoteReducer(
			stateReducers.setTimingWizardStepIndex,
			{
				notify: "all",
			},
		),
		setTimingWizardPhaseId: createRemoteReducer(
			stateReducers.setTimingWizardPhaseId,
			{
				notify: "all",
			},
		),
		openTimingPhase: createRemoteReducer(stateReducers.openTimingPhase, {
			notify: "all",
		}),
		closeTimingPhase: createRemoteReducer(stateReducers.closeTimingPhase, {
			notify: "all",
		}),
		startTimingWizard: createRemoteReducer(stateReducers.startTimingWizard, {
			notify: "all",
		}),
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
