import type { AppThunk, BoardId } from "@shared/model";
import { TURN_ABILITY_LIMITS } from "../../../../../../../shared/config";
import {
	setCurrentStat,
	setValueTransaction,
} from "../../../../../../../shared/lib/store/features/board/actions/stats";
import { resetAbilityLimits } from "../../../../../../../shared/lib/store/features/board/actions/stats/ability/resetAbilityLimits";
import { selectBoardById } from "../../../../../../../shared/lib/store/features/board/selectors";

export const startNewTurn =
	(boardId?: BoardId): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const { baseValue } = selectBoardById(boardId)(state);

		dispatch(resetAbilityLimits(TURN_ABILITY_LIMITS, boardId));

		if (baseValue.additionalAction) {
			dispatch(
				setValueTransaction(
					{
						additionalAction: true,
						actions: baseValue.actions,
					},
					boardId,
				),
			);
			return;
		}

		dispatch(
			setCurrentStat("actions", baseValue.actions, {
				boardId,
			}),
		);
	};
