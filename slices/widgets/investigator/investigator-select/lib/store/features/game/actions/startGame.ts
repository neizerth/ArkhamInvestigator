import {
	setCurrentInvestigatorIndex,
	setInvestigatorBoards,
} from "@modules/board/base/shared/lib";
import { updateChaosBag } from "@modules/chaos-bag/base/entities/lib";
import type { ActionCreator } from "@reduxjs/toolkit";
import {
	replacePageTo,
	setSelectedInvestigators,
	setShowDescription,
} from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { selectGameInvestigatorBoards } from "../selectors";

export const startGame: ActionCreator<AppThunk> =
	() => (dispatch, getState) => {
		const state = getState();

		const investigatorBoards = selectGameInvestigatorBoards(state);

		dispatch(setInvestigatorBoards(investigatorBoards));
		dispatch(setCurrentInvestigatorIndex(0));
		dispatch(setSelectedInvestigators([]));
		dispatch(setShowDescription(false));
		dispatch(updateChaosBag());

		dispatch(replacePageTo("/board"));
	};
