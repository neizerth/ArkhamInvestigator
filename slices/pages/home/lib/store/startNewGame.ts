import type { ActionCreator } from "@reduxjs/toolkit";
import {
	type AppThunk,
	goToPage,
	replacePageTo,
	setInvestigatorBoards,
	setSelectedInvestigators,
} from "@shared/lib";

export const startNewGame: ActionCreator<AppThunk> = () => (dispatch) => {
	dispatch(goToPage("/select-investigators"));
	dispatch(setSelectedInvestigators([]));
	dispatch(setInvestigatorBoards([]));
};
