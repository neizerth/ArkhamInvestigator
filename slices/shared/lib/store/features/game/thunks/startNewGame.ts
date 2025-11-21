import {
	selectSaveTrauma,
	setClues,
	setDoom,
	setInvestigatorBoards,
	setResources,
} from "@modules/board/base/shared/lib";
import { clearRevealHistory } from "@modules/chaos-bag/reveal/history/shared/lib";
import type { ActionCreator } from "@reduxjs/toolkit";

import { setRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { setBoardChaosTokenValue } from "@modules/chaos-bag/value/shared/lib";
import { closeModal } from "@modules/core/modal/shared/base/lib";
import { goToPage } from "@modules/core/router/shared/lib/store/features/goToPage";
import { clearTraumaSettings } from "@modules/signature/base/shared/lib";
import type { AppThunk } from "@shared/model";
import { routes } from "../../../../../config";
import { newGameStarted } from "../actions/startNewGame";
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
		dispatch(setRevealedTokens([]));
		dispatch(
			closeModal({
				source: "effect",
			}),
		);

		dispatch(setReplaceInvestigator(false));
		dispatch(setBoardChaosTokenValue(null));

		dispatch(setSelectedInvestigators([]));
		dispatch(setInvestigatorBoards([]));
		dispatch(goToPage(routes.selectInvestigators));

		dispatch(newGameStarted());
	};
