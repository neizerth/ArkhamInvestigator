import {
	clearSkillCheckHistoryItem,
	getSkillCheckValue,
	sanitizeSkillCheckExpression,
	selectCurrentBoardProp,
	selectSkillCheckHistory,
	setSkillCheckData,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type { SkillCheckHistoryItem, SkillCheckItem } from "@shared/model";
import { memo, useCallback, useMemo, useRef } from "react";
import type { ListRenderItemInfo, ViewProps, ViewStyle } from "react-native";
import type { FlatList } from "react-native-gesture-handler";
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
		return history.map((item) => ({
			...item,
			currentValue: getSkillCheckValue({
				data: sanitizeSkillCheckExpression(item.expression),
				value,
			}),
		}));
	}, [history, value]);

	const pinned = useMemo(() => {
		return data.filter(({ pinned }) => pinned).slice(0, size);
	}, [size, data]);

	const regularSize = useMemo(() => {
		return Math.max(0, size - pinned.length);
	}, [size, pinned.length]);

	const regular = data.filter(({ pinned }) => !pinned).slice(-regularSize);

	const ref = useRef<FlatList>(null);

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
			dispatch(clearSkillCheckHistoryItem(item.id));
		},
		[dispatch],
	);

	const renderItem = useCallback(
		(item: ListItem) => {
			return (
				<C.Item
					key={item.id}
					onPress={setCurrentValue(item.expression)}
					onLongPress={clearValue(item)}
				>
					<C.ItemContent
						itemId={item.id}
						data={item.expression}
						type="secondary"
						value={item.value}
					/>
				</C.Item>
			);
		},
		[clearValue, setCurrentValue],
	);

	const renderListItem = useCallback(
		(listItem: ListRenderItemInfo<ListItem>) => {
			const { item } = listItem;

			return renderItem(item);
		},
		[renderItem],
	);

	return (
		<C.Container style={contentContainerStyle}>
			{pinned.length > 0 && <C.Pinned>{pinned.map(renderItem)}</C.Pinned>}
			<C.List
				{...props}
				ref={ref}
				onContentSizeChange={onContentSizeChange}
				data={regular}
				renderItem={renderListItem}
			/>
		</C.Container>
	);
};

export const ExpressionHistoryMemo = memo(ExpressionHistory);
