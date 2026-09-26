import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { ChaosTokenRevealHistoryItem } from "../ChaosTokenRevealHistoryItem";
export const Container: typeof View = styled(View)`
	height: 64px;
	padding-bottom: 5px;
`;

export const List: typeof FlatList = styled(FlatList).attrs(({ theme }) => ({
	contentContainerStyle: {
		paddingHorizontal: theme.size.gap.default,
		gap: theme.size.gap.small,
	},
}))`
  border-radius: 32px;
	padding: ${({ theme }) => theme.size.gap.small}px 0;
`;

export const Item: typeof ChaosTokenRevealHistoryItem = styled(
	ChaosTokenRevealHistoryItem,
)`
`;
