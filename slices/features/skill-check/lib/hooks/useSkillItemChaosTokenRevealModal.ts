import {
	getSkillCheckValue,
	sanitizeSkillCheckExpression,
	selectCurrentBoardProp,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { SkillCheckHistoryItem } from "@shared/model";
import { useCallback } from "react";
import { openSkillCheckChaosBagModal } from "../../../chaos-bag";

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
					openSkillCheckChaosBagModal({
						type,
						title,
						value: expressionValue,
					}),
				);
			},
		[dispatch, value],
	);
};
