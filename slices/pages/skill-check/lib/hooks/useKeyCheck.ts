import { startChaosBagReveal } from "@modules/chaos-bag/reveal/base/shared/lib";
import {
	getSkillCheckValue,
	selectCurrentBoardProp,
	selectSkillCheckType,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type {
	InvestigatorBoardNumericStat,
	SkillCheckItem,
	SkillCheckOperator,
} from "@shared/model";
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
						type,
						value,
						expression,
					}),
				);
			},
		[dispatch, type, boardValue],
	);
};
