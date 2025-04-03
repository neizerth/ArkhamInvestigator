import {
	clearSkillCheckHistoryItem,
	getSkillCheckValue,
	selectBoardProps,
	selectSkillCheckHistory,
	setSkillCheckData,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { SkillCheckHistoryItem, SkillCheckItem } from "@shared/model";
import { useCallback, useRef } from "react";
import type { ScrollView, ViewProps } from "react-native";
import { ExpressionDisplay } from "../ExpressionDisplay";
import * as C from "./ExpressionHistory.components";

export type ExpressionHistoryProps = ViewProps & {
	size?: number;
};

export const ExpressionHistory = ({
	size = 1,
	...props
}: ExpressionHistoryProps) => {
	const dispatch = useAppDispatch();
	const history = useAppSelector(selectSkillCheckHistory);
	const { value } = useAppSelector(selectBoardProps(["value"]));

	const data = history.slice(0, size).map((item) => ({
		...item,
		currentValue: getSkillCheckValue({
			data: item.expression,
			value,
		}),
	}));

	const ref = useRef<ScrollView>(null);

	const onContentSizeChange = useCallback(() => {
		if (!ref.current) {
			return;
		}
		ref.current.scrollToEnd();
	}, []);

	const setCurrentValue = useCallback(
		(data: SkillCheckItem[]) => () => {
			dispatch(setSkillCheckData(data));
		},
		[dispatch],
	);

	const clearValue = useCallback(
		(item: SkillCheckHistoryItem) => () => {
			dispatch(clearSkillCheckHistoryItem(item));
		},
		[dispatch],
	);

	return (
		<C.Container {...props} ref={ref} onContentSizeChange={onContentSizeChange}>
			{data.map((item) => (
				<C.Item key={item.id}>
					<ExpressionDisplay
						data={item.expression}
						type="secondary"
						value={item.value}
						onPress={setCurrentValue(item.expression)}
						onLongPress={clearValue(item)}
					/>
				</C.Item>
			))}
		</C.Container>
	);
};
