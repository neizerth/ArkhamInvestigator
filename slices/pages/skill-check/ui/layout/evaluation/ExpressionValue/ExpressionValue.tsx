import {
	getSkillCheckValue,
	sanitizeSkillCheckExpression,
	selectCurrentBoard,
	selectSkillCheckData,
	useAppSelector,
} from "@shared/lib";
import { last } from "ramda";
import type { ViewProps } from "react-native";
import * as C from "./ExpressionValue.components";

export type ExpressionValueProps = ViewProps;

export const ExpressionValue = (props: ExpressionValueProps) => {
	const data = useAppSelector(selectSkillCheckData);
	const board = useAppSelector(selectCurrentBoard);

	if (!board) {
		return null;
	}

	const validData = sanitizeSkillCheckExpression(data);

	const value = getSkillCheckValue({
		data: validData,
		value: board.value,
	});

	const showValue =
		validData.length > 0 &&
		!(validData.length === 1 && validData[0].type === "number");

	return (
		<C.Container {...props}>
			<C.Value>{showValue && `=${value}`}</C.Value>
		</C.Container>
	);
};
