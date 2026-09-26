import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { ExpressionHistoryItemMemo as HistoryItem } from "../item/ExpressionHistoryItem";

export const Container: typeof View = styled(View)`
	gap: 5px;
`;

export const List: typeof FlatList = styled(FlatList).attrs(({ theme }) => ({
	contentContainerStyle: {
		gap: theme.size.gap.small,
	},
}))`
	flex: 1;
`;

export const Item: typeof HistoryItem = styled(HistoryItem)`
`;

export const Pinned: typeof View = styled(View)`
	gap: ${({ theme }) => theme.size.gap.small}px;
`;
