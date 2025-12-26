import { selectCurrentBoardProp } from "@modules/board/base/shared/lib";
import {
	selectShowCalculationDiff,
	selectSkillCheckHistory,
} from "@modules/board/skill-check/shared/lib";
import {
	formatSkillCheckValue as formatValue,
	getSkillCheckValue,
	sanitizeSkillCheckExpression,
	useAppSelector,
} from "@shared/lib";
import type { TextViewProps } from "@shared/ui";
import { last, omit } from "ramda";
import { isNumber } from "ramda-adjunct";
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
	valueStyle,
	signStyle: signStyleProp,
	showDiff: showDiffProp,
	odds,
	...props
}: SkillCheckExpressionDisplayProps) => {
	const showDefaultDiff = useAppSelector(selectShowCalculationDiff);

	const showDiff =
		showDefaultDiff === false
			? false
			: showDiffProp !== undefined
				? showDiffProp
				: showDefaultDiff;

	const history = useAppSelector(selectSkillCheckHistory("current"));
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
							<C.Value style={[textStyle, valueStyle]}>
								{formatValue(currentValue)}
							</C.Value>
						</>
					) : (
						<>
							<C.Value
								contentContainerStyle={equalsContainerStyle}
								style={[textStyle, equalsStyle]}
							>
								=
							</C.Value>
							<C.Value style={[textStyle, valueStyle]}>
								{formatValue(value)}
							</C.Value>
						</>
					))}
			</C.Expression>

			{isNumber(odds) && <C.Odds>{odds}%</C.Odds>}
		</C.Container>
	);
};
