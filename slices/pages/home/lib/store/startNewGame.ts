import {
	setChaosBagSealedTokens,
	setRevealedTokenIds,
} from "@features/chaos-bag";
import type { ActionCreator } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import {
	clearTraumaSettings,
	goToPage,
	selectSaveTrauma,
	setClues,
	setDoom,
	setInvestigatorBoards,
	setResources,
	setSelectedInvestigators,
} from "@shared/lib";
import type { AppThunk } from "@shared/model";

export const startNewGame: ActionCreator<AppThunk> =
	() => (dispatch, getState) => {
		const state = getState();
		const saveTrauma = selectSaveTrauma(state);
		if (!saveTrauma) {
			dispatch(clearTraumaSettings());
		}

		dispatch(setDoom(0));
		dispatch(setClues(0));
		dispatch(setResources(0));
		dispatch(setRevealedTokenIds([]));
		dispatch(setChaosBagSealedTokens([]));
		dispatch(setSelectedInvestigators([]));
		dispatch(setInvestigatorBoards([]));
		dispatch(goToPage(routes.selectInvestigators));
	};
