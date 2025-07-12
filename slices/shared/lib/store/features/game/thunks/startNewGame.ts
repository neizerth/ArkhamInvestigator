import {
	selectSaveTrauma,
	setClues,
	setDoom,
	setInvestigatorBoards,
	setResources,
} from "@modules/board/base/shared/lib";
import { setRevealedTokenIds } from "@modules/chaos-bag/reveal/base/shared/lib";
import { clearRevealHistory } from "@modules/chaos-bag/reveal/history/shared/lib";
import { setShowRevealModal } from "@modules/chaos-bag/reveal/modal/shared/lib";
import type { ActionCreator } from "@reduxjs/toolkit";

import type { AppThunk } from "@shared/model";
import { routes } from "../../../../../config";
import { goToPage } from "../../../effects";
import { clearTraumaSettings } from "../../investigators/thunks/clearTraumaSettings";
import { setReplaceInvestigator, setSelectedInvestigators } from "../game";

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
		dispatch(setShowRevealModal(false));

		dispatch(setReplaceInvestigator(false));

		dispatch(setSelectedInvestigators([]));
		dispatch(setInvestigatorBoards([]));
		dispatch(goToPage(routes.selectInvestigators));
	};
