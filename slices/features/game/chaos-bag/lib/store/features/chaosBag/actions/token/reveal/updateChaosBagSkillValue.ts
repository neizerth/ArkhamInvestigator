import { selectBoardById } from "@shared/lib";
import type {
	AppThunk,
	BoardId,
	SkillCheckItem,
	SkillCheckOperator,
} from "@shared/model";
import { v4 } from "uuid";
import {
	selectChaosBagSkillCheckType,
	selectRevealHistoryItem,
	setChaosBagSkillCheckExpression,
	setChaosBagSkillCheckTitle,
	setChaosBagSkillValue,
	setRevealHistoryItem,
} from "../../../chaosBag";

type Options = {
	boardId: BoardId;
	value: number;
};

export const updateChaosBagSkillValue =
	({ boardId, value }: Options): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const skillType = selectChaosBagSkillCheckType(state);
		const board = selectBoardById(boardId)(state);

		if (!skillType) {
			return;
		}

		const statValue = board.value[skillType];

		dispatch(setChaosBagSkillCheckExpression([]));
		dispatch(setChaosBagSkillCheckTitle(null));
		dispatch(setChaosBagSkillValue(value));

		let expression: SkillCheckItem[] = [];

		if (value !== statValue) {
			const operator: SkillCheckOperator =
				value > statValue ? "add" : "subtract";

			const diff = Math.abs(value - statValue);

			expression = [
				{
					id: v4(),
					type: "stat",
					statType: skillType,
				},
				{
					id: v4(),
					type: "operator",
					operator,
				},
				{
					id: v4(),
					type: "number",
					value: diff,
				},
			];
		}

		dispatch(setChaosBagSkillCheckExpression(expression));

		const historyItem = selectRevealHistoryItem(state);

		if (!historyItem) {
			return;
		}

		dispatch(
			setRevealHistoryItem({
				...historyItem,
				skillCheckValue: value,
				skillCheckExpression: expression,
			}),
		);
	};
