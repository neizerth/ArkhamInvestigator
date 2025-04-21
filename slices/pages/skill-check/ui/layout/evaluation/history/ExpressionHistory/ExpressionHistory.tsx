import {
	clearSkillCheckHistoryItem,
	getSkillCheckValue,
	selectCurrentBoardProp,
	selectSkillCheckHistory,
	setSkillCheckData,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { SkillCheckHistoryItem, SkillCheckItem } from "@shared/model";
import { useCallback, useMemo, useRef } from "react";
import type { ScrollView, ViewProps, ViewStyle } from "react-native";
import * as C from "./ExpressionHistory.components";

export type ExpressionHistoryProps = ViewProps & {
	size?: number;
	contentContainerStyle?: ViewStyle;
};

type ListItem = SkillCheckHistoryItem & {
	currentValue: number;
};

export const ExpressionHistory = ({
	size = 1,
	contentContainerStyle,
	...props
}: ExpressionHistoryProps) => {
	const dispatch = useAppDispatch();
	const history = useAppSelector(selectSkillCheckHistory);
	const value = useAppSelector(selectCurrentBoardProp("value"));

	const data = useMemo(() => {
		return history.slice(0, size).map((item) => ({
			...item,
			currentValue: getSkillCheckValue({
				data: item.expression,
				value,
			}),
		}));
	}, [history, size, value]);

	const regular = data.filter(({ pinned }) => !pinned);
	const pinned = data.filter(({ pinned }) => pinned);

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

	const renderItem = useCallback(
		(item: ListItem) => {
			return (
				<C.Item
					key={item.id}
					itemId={item.id}
					data={item.expression}
					type="secondary"
					value={item.value}
					onPress={setCurrentValue(item.expression)}
					onLongPress={clearValue(item)}
				/>
			);
		},
		[clearValue, setCurrentValue],
	);

	return (
		<C.Container style={contentContainerStyle}>
			<C.Pinned>{pinned.map(renderItem)}</C.Pinned>
			<C.List {...props} ref={ref} onContentSizeChange={onContentSizeChange}>
				{regular.map(renderItem)}
			</C.List>
		</C.Container>
	);
};
