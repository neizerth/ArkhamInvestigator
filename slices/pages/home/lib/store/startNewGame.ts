import type { ActionCreator } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import {
	type AppThunk,
	goToPage,
	replacePageTo,
	setInvestigatorBoards,
	setSelectedInvestigators,
} from "@shared/lib";

export const startNewGame: ActionCreator<AppThunk> = () => (dispatch) => {
	dispatch(goToPage(routes.selectInvestigators));
	dispatch(setSelectedInvestigators([]));
	dispatch(setInvestigatorBoards([]));
};
