import { size } from "@shared/config";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { ExpressionHistoryItem } from "../item/ExpressionHistoryItem";

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

export const Item: typeof ExpressionHistoryItem = styled(ExpressionHistoryItem)`
`;

export const Pinned: typeof View = styled(View)`
	gap: ${size.gap.small}px;
`;
