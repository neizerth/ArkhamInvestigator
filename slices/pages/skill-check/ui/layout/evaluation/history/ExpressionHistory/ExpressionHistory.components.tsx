import { TouchableOpacity } from "@features/haptic";
import { size } from "@shared/config";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { ExpressionHistoryItemMemo as HistoryItem } from "../item/ExpressionHistoryItem";

export const Container: typeof View = styled(View)`
	gap: 5px;
`;

export const List: typeof FlatList = styled(FlatList).attrs({
	contentContainerStyle: {
		gap: size.gap.small,
	},
})`
	flex: 1;
`;

export const Item: typeof TouchableOpacity = styled(TouchableOpacity)`
`;

export const ItemContent: typeof HistoryItem = styled(HistoryItem)`
`;

export const Pinned: typeof View = styled(View)`
	gap: ${size.gap.small}px;
`;
