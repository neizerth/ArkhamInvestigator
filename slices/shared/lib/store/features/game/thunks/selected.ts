import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk, SelectedInvestigator } from "@shared/model";
import { propEq, reject } from "ramda";
import { selectSelectedInvestigators, setSelectedInvestigators } from "../game";

export const removeSelectedInvestigator: ActionCreator<AppThunk> =
	(code: string) => (dispatch, getState) => {
		const state = getState();
		const selected = selectSelectedInvestigators(state);
		const withCode = propEq(code, "code");
		const selectedInvestigators = reject(withCode, selected);

		dispatch(setSelectedInvestigators(selectedInvestigators));
	};

export const addSelectedInvestigator =
	(investigator: SelectedInvestigator): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const selected = selectSelectedInvestigators(state);

		dispatch(setSelectedInvestigators([...selected, investigator]));
	};

export const clearSelectedInvestigators: ActionCreator<AppThunk> =
	() => (dispatch) =>
		dispatch(setSelectedInvestigators([]));
