import {
	selectSaveTrauma,
	setClues,
	setDoom,
	setInvestigatorBoards,
	setResources,
} from "@modules/board/base/shared/lib";
import { setRevealedTokenIds } from "@modules/chaos-bag/reveal/base/shared/lib";
import { clearRevealHistory } from "@modules/chaos-bag/reveal/history/shared/lib";
import type { ActionCreator } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import {
	clearTraumaSettings,
	goToPage,
	setReplaceInvestigator,
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

		dispatch(clearRevealHistory());
		dispatch(setRevealedTokenIds([]));

		dispatch(setReplaceInvestigator(false));

		dispatch(setSelectedInvestigators([]));
		dispatch(setInvestigatorBoards([]));
		dispatch(goToPage(routes.selectInvestigators));
	};
