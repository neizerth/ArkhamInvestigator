import type { AppThunk, BoardId } from "@shared/model";
import { setCurrentStat } from "../../../../../../../shared/lib/store/features/board/actions/stats";
import { resetAbilityLimits } from "../../../../../../../shared/lib/store/features/board/actions/stats/ability/resetAbilityLimits";
import { selectBoardById } from "../../../../../../../shared/lib/store/features/board/selectors";
import { startNewTurn } from "../common/startNewTurn";
import { giveUpkeepResourceToBoard } from "../upkeep";

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
		dispatch(giveUpkeepResourceToBoard(boardId));
	};
