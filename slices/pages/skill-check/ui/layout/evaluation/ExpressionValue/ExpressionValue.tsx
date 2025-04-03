import {
	formatSkillCheckValue as formatValue,
	getSkillCheckValue,
	sanitizeSkillCheckExpression,
	selectBoardProps,
	selectSkillCheckData,
	useAppSelector,
} from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./ExpressionValue.components";

export type ExpressionValueProps = ViewProps;

export const ExpressionValue = (props: ExpressionValueProps) => {
	const data = useAppSelector(selectSkillCheckData);
	const board = useAppSelector(selectBoardProps(["value"]));

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
			<C.Value>{showValue && `=${formatValue(value)}`}</C.Value>
		</C.Container>
	);
};
