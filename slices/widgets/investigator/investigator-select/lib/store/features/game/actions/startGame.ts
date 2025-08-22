import {
	setCurrentInvestigatorIndex,
	setInvestigatorBoards,
} from "@modules/board/base/shared/lib";
import { updateChaosBag } from "@modules/chaos-bag/base/entities/lib";
import { goToPage } from "@modules/core/router/shared/lib";
import type { ActionCreator } from "@reduxjs/toolkit";
import { routes } from "@shared/config";
import { setSelectedInvestigators, setShowDescription } from "@shared/lib";
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
		dispatch(
			updateChaosBag({
				source: "effect",
			}),
		);

		dispatch(
			goToPage({
				href: routes.board,
				replace: true,
			}),
		);
	};
