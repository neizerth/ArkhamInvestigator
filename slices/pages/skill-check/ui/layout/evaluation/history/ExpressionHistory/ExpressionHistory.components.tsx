import { size } from "@shared/config";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { ExpressionHistoryItemMemo as HistoryItem } from "../item/ExpressionHistoryItem";

export const Container: typeof View = styled(View)`
	gap: 5px;
`;

export const List: typeof ScrollView = styled(ScrollView).attrs({
	contentContainerStyle: {
		gap: size.gap.small,
	},
})`
	flex: 1;
`;

export const Item: typeof HistoryItem = styled(HistoryItem)`
`;

export const Pinned: typeof View = styled(View)`
	gap: ${size.gap.small}px;
`;
