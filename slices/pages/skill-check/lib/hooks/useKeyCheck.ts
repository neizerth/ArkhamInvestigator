import { selectCurrentBoardProp } from "@modules/board/base/shared/lib";
import { selectSkillCheckType } from "@modules/board/skill-check/shared/lib";
import type {
	SkillCheckItem,
	SkillCheckOperator,
} from "@modules/board/skill-check/shared/model";
import { startChaosBagReveal } from "@modules/chaos-bag/reveal/base/entities/lib/store/features/startReveal/startChaosBagReveal";
import {
	getSkillCheckValue,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { InvestigatorBoardNumericStat } from "@shared/model";
import { useCallback } from "react";

type Options = {
	operator?: SkillCheckOperator;
} & (
	| {
			type: "number";
			value: number;
	  }
	| {
			type: "stat";
			statType: InvestigatorBoardNumericStat;
	  }
);
export const useKeyCheck = () => {
	const dispatch = useAppDispatch();
	const type = useAppSelector(selectSkillCheckType);
	const boardValue = useAppSelector(selectCurrentBoardProp("value"));

	return useCallback(
		({ operator = "add", ...item }: Options) =>
			() => {
				if (!type || !boardValue) {
					return false;
				}
				const baseExpression: SkillCheckItem[] = [
					{
						id: "base-stat",
						type: "stat",
						statType: type,
					},
				];

				const fullExpression: SkillCheckItem[] = [
					...baseExpression,
					{
						id: "operation",
						type: "operator",
						operator: operator,
					},
					{
						id: "extra",
						...item,
					},
				];

				const showBase = item.type === "number" && item.value === 0;

				const expression = showBase ? baseExpression : fullExpression;

				const value = getSkillCheckValue({
					data: expression,
					value: boardValue,
				});

				dispatch(
					startChaosBagReveal({
						boardId: "current",
						type,
						value,
						expression,
					}),
				);
			},
		[dispatch, type, boardValue],
	);
};
