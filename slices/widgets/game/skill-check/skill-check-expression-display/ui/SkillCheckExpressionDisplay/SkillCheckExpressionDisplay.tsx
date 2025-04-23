import {
	formatSkillCheckValue as formatValue,
	getSkillCheckValue,
	sanitizeSkillCheckExpression,
	selectCurrentBoardProp,
	selectSkillCheckHistory,
	useAppSelector,
} from "@shared/lib";
import type { TextViewProps } from "@shared/ui";
import { last, omit } from "ramda";
import { Fragment, useCallback } from "react";
import { StyleSheet } from "react-native";
import type { SkillCheckExpressionDisplayProps } from "./ExpressionDisplay.types";
import * as C from "./SkillCheckExpressionDisplay.components";
import { iconMapping, operatorMapping } from "./mapping";

export type { SkillCheckExpressionDisplayProps as ExpressionDisplayProps };

export const SkillCheckExpressionDisplay = ({
	data,
	value,
	expressionStyle,
	textStyle,
	statStyle,
	equalsStyle,
	equalsContainerStyle,
	signStyle: signStyleProp,
	showDiff = true,
	...props
}: SkillCheckExpressionDisplayProps) => {
	const history = useAppSelector(selectSkillCheckHistory);
	const boardValue = useAppSelector(selectCurrentBoardProp("value"));

	const lastValue = last(history)?.value;

	const validData = sanitizeSkillCheckExpression(data);
	const currentValue = getSkillCheckValue({
		data: validData,
		value: boardValue,
	});

	const charStyle = omit(["color"], StyleSheet.flatten(textStyle));
	const signStyle = [charStyle, signStyleProp];

	const T = useCallback(
		(props: TextViewProps) => {
			return <C.Text {...props} style={textStyle} />;
		},
		[textStyle],
	);

	return (
		<C.Container {...props}>
			<C.Expression style={expressionStyle}>
				{data.length === 0 && lastValue !== undefined && (
					<T>{formatValue(lastValue)}</T>
				)}
				{data.map((item) => (
					<Fragment key={item.id}>
						{item.type === "number" && <T>{formatValue(item.value)}</T>}
						{item.type === "operator" && (
							<T>{operatorMapping[item.operator]}</T>
						)}
						{item.type === "stat" && (
							<C.Stat
								icon={iconMapping[item.statType] || item.statType}
								style={[textStyle, statStyle]}
							/>
						)}
					</Fragment>
				))}
				{value !== undefined &&
					(value !== currentValue ? (
						<>
							<C.Value
								contentContainerStyle={equalsContainerStyle}
								style={[textStyle, equalsStyle]}
							>
								=
							</C.Value>
							{showDiff && (
								<>
									<C.OldValue style={charStyle}>
										{formatValue(value)}
									</C.OldValue>
									{currentValue > value ? (
										<C.Greater style={signStyle}>↗</C.Greater>
									) : (
										<C.Lower style={signStyle}>↘</C.Lower>
									)}
								</>
							)}
							<C.Value style={textStyle}>{formatValue(currentValue)}</C.Value>
						</>
					) : (
						<>
							<C.Value
								contentContainerStyle={equalsContainerStyle}
								style={[textStyle, equalsStyle]}
							>
								=
							</C.Value>
							<C.Value style={textStyle}>{formatValue(value)}</C.Value>
						</>
					))}
			</C.Expression>
		</C.Container>
	);
};
