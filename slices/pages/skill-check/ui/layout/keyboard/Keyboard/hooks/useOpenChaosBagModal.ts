import { openSkillCheckChaosBagModal } from "@features/chaos-bag";
import {
	getSkillCheckValue,
	sanitizeSkillCheckExpression,
	selectCurrentBoardProp,
	selectSkillCheckData,
	selectSkillCheckType,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";

export const useOpenChaosBagModal = () => {
	const dispatch = useAppDispatch();

	const type = useAppSelector(selectSkillCheckType);
	const expression = useAppSelector(selectSkillCheckData);
	const value = useAppSelector(selectCurrentBoardProp("value"));

	return useCallback(() => {
		if (!type) {
			return;
		}

		const safeExpression = sanitizeSkillCheckExpression(expression);
		const skillValue = getSkillCheckValue({
			data: safeExpression,
			value,
		});
		dispatch(
			openSkillCheckChaosBagModal({
				type,
				value: skillValue,
				expression: safeExpression,
			}),
		);
	}, [dispatch, type, value, expression]);
};
