import type { AppThunk, BoardId } from "@shared/model";
import { TURN_ABILITY_LIMITS } from "../../../../../../config";
import { selectBoardById } from "../../selectors";
import { setCurrentStat, setValueTransaction } from "../stats";
import { resetAbilityLimits } from "../stats/ability/resetAbilityLimits";

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
