import type { ActionCreator } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import {
	goToPage,
	setInvestigatorBoards,
	setSelectedInvestigators,
} from "@shared/lib";
import type { AppThunk } from "@shared/model";

export const startNewGame: ActionCreator<AppThunk> = () => (dispatch) => {
	dispatch(setSelectedInvestigators([]));
	dispatch(setInvestigatorBoards([]));
	dispatch(goToPage(routes.selectInvestigators));
};
