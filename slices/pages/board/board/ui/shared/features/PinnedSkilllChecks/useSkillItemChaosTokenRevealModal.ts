import { openSkillCheckChaosBagModal } from "@features/chaos-bag";
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
		({ type, expression }: SkillCheckHistoryItem) =>
			() => {
				const safeExpression = sanitizeSkillCheckExpression(expression);

				const expressionValue = getSkillCheckValue({
					data: safeExpression,
					value,
				});
				dispatch(
					openSkillCheckChaosBagModal({
						type,
						value: expressionValue,
					}),
				);
			},
		[dispatch, value],
	);
};
