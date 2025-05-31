import { openSkillCheckChaosBagModal } from "@features/game/chaos-bag";
import {
	formatSkillCheckValue as formatValue,
	getSkillCheckValue,
	sanitizeSkillCheckExpression,
	selectCurrentBoardProp,
	selectSkillCheckData,
	selectSkillCheckType,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ExpressionValue.components";

export type ExpressionValueProps = ViewProps;

export const ExpressionValue = (props: ExpressionValueProps) => {
	const dispatch = useAppDispatch();
	const data = useAppSelector(selectSkillCheckData);
	const type = useAppSelector(selectSkillCheckType);
	const boardValue = useAppSelector(selectCurrentBoardProp("value"));

	const validData = sanitizeSkillCheckExpression(data);

	const value = getSkillCheckValue({
		data: validData,
		value: boardValue,
	});

	const showValue =
		validData.length > 0 &&
		!(validData.length === 1 && validData[0].type === "number");

	const onLongPress = useCallback(() => {
		if (!type || !showValue) {
			return false;
		}
		dispatch(
			openSkillCheckChaosBagModal({
				type,
				value,
				expression: validData,
			}),
		);
	}, [dispatch, value, type, showValue, validData]);

	return (
		<C.Container {...props} onLongPress={onLongPress}>
			<C.Value>{showValue && `=${formatValue(value)}`}</C.Value>
		</C.Container>
	);
};
