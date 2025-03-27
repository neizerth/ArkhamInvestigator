import {
	formatSkillCheckValue as formatValue,
	getSkillCheckValue,
	sanitizeSkillCheckExpression,
	selectCurrentBoard,
	selectSkillCheckHistory,
	useAppSelector,
} from "@shared/lib";
import { last } from "ramda";
import { Fragment } from "react";
import * as C from "./ExpressionDisplay.components";
import type { ExpressionDisplayProps } from "./ExpressionDisplay.types";
import { iconMapping, operatorMapping } from "./mapping";

export type { ExpressionDisplayProps };

export const ExpressionDisplay = ({
	data,
	value,
	...props
}: ExpressionDisplayProps) => {
	const history = useAppSelector(selectSkillCheckHistory);
	const board = useAppSelector(selectCurrentBoard);

	const { type } = props;

	const lastValue = last(history)?.value;

	const validData = sanitizeSkillCheckExpression(data);
	const currentValue = getSkillCheckValue({
		data: validData,
		value: board?.value,
	});

	return (
		<C.Container {...props}>
			<C.Expression type={type}>
				{data.length === 0 && lastValue !== undefined && formatValue(lastValue)}
				{data.map((item) => (
					<Fragment key={item.id}>
						{item.type === "number" && formatValue(item.value)}
						{item.type === "operator" && operatorMapping[item.operator]}
						{item.type === "stat" && (
							<C.Stat
								icon={iconMapping[item.statType] || item.statType}
								type={type}
							/>
						)}
					</Fragment>
				))}
				{value !== undefined &&
					(value !== currentValue ? (
						<>
							<C.Value>=</C.Value>
							<C.OldValue>{formatValue(value)}</C.OldValue>
							{currentValue > value ? (
								<C.Greater>↗</C.Greater>
							) : (
								<C.Lower>↘</C.Lower>
							)}
							<C.Value>{formatValue(currentValue)}</C.Value>
						</>
					) : (
						<C.Value>={formatValue(value)}</C.Value>
					))}
			</C.Expression>
		</C.Container>
	);
};
