import { createSlice } from "@reduxjs/toolkit";
import type { RulesItem } from "@shared/model";
import { createSliceState } from "redux-toolkit-helpers";
import type { TimingPhaseId } from "../../../../model";
import * as reducers from "./reducers";

export type RulesState = {
	rules?: RulesItem[];
	openTimingPhases?: number[];
	timingWizardStepIndex: number | null;
	timingWizardPhaseId: TimingPhaseId | null;
};

const initialState: RulesState = {
	rules: [],
	openTimingPhases: [],
	timingWizardStepIndex: null,
	timingWizardPhaseId: null,
};

const state = createSliceState(initialState);

export const rules = createSlice({
	name: "rules",
	...state,
	reducers: {
		...state.reducers,
		...reducers,
	},
});

export const {
	setRules,
	setOpenTimingPhases,
	setTimingWizardStepIndex,
	setTimingWizardPhaseId,

	openTimingPhase,
	closeTimingPhase,
	startTimingWizard,
} = rules.actions;

export const {
	selectRules,
	selectOpenTimingPhases,
	selectTimingWizardStepIndex,
	selectTimingWizardPhaseId,
} = rules.selectors;

export default rules.reducer;
