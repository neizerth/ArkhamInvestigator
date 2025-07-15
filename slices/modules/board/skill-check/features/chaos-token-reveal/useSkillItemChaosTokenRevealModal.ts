import { selectCurrentBoardProp } from "@modules/board/base/shared/lib";
import { startChaosBagReveal } from "@modules/chaos-bag/reveal/base/entities/lib";
import {
	getSkillCheckValue,
	sanitizeSkillCheckExpression,
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
						boardId: "current",
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
