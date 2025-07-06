import { startChaosBagReveal } from "@modules/chaos-bag/reveal/base/shared/lib";
import {
	getSkillCheckValue,
	sanitizeSkillCheckExpression,
	selectCurrentBoardProp,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { SkillCheckHistoryItem } from "@shared/model";
import { useCallback } from "react";

export const useSkillItemChaosTokenRevealModal = () => {
	const value = useAppSelector(selectCurrentBoardProp("value"));
	const dispatch = useAppDispatch();

	return useCallback(
		({ type, expression, title }: SkillCheckHistoryItem) =>
			() => {
				const safeExpression = sanitizeSkillCheckExpression(expression);

				const expressionValue = getSkillCheckValue({
					data: safeExpression,
					value,
				});
				dispatch(
					startChaosBagReveal({
						type,
						title,
						value: expressionValue,
						expression: safeExpression,
					}),
				);
			},
		[dispatch, value],
	);
};
