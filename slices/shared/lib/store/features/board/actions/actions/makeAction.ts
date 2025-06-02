import type { AppThunk, BoardId } from "@shared/model";
import { selectBoardById } from "../../selectors";
import { setCurrentStat } from "../stats";
import { resetAbilityLimits } from "../stats/ability/resetAbilityLimits";
import { startNewTurn } from "./startNewTurn";

export const makeAction =
	(boardId?: BoardId): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardById(boardId)(state);
		const { actions } = board.value;

		if (actions > 0) {
			dispatch(
				setCurrentStat("actions", actions - 1, {
					boardId,
				}),
			);
			dispatch(resetAbilityLimits(["turn"], boardId));
			return;
		}
		dispatch(startNewTurn(boardId));
	};
