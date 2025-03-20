import {
	getSkillCheckValue,
	sanitizeSkillCheckExpression,
	selectCurrentBoard,
	selectSkillCheckHistory,
	setSkillCheckData,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { last } from "ramda";
import { Fragment, useCallback } from "react";
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
				{data.length === 0 && lastValue}
				{data.map((item) => (
					<Fragment key={item.id}>
						{item.type === "number" && item.value}
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
							<C.OldValue>{value}</C.OldValue>
							{currentValue > value ? (
								<C.Greater>↗</C.Greater>
							) : (
								<C.Lower>↘</C.Lower>
							)}
							<C.Value>{currentValue}</C.Value>
						</>
					) : (
						<C.Value>={value}</C.Value>
					))}
			</C.Expression>
		</C.Container>
	);
};
