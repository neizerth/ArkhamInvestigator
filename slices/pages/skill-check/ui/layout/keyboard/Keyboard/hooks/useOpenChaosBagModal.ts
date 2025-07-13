import { selectCurrentBoardProp } from "@modules/board/base/shared/lib";
import {
	selectSkillCheckData,
	selectSkillCheckType,
} from "@modules/board/skill-check/shared/lib";
import { startChaosBagRevealInternal } from "@modules/chaos-bag/reveal/base/shared/lib";
import {
	getSkillCheckValue,
	sanitizeSkillCheckExpression,
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
			startChaosBagRevealInternal({
				type,
				value: skillValue,
				expression: safeExpression,
			}),
		);
	}, [dispatch, type, value, expression]);
};
