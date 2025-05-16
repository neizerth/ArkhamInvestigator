import { color, size } from "@shared/config";
import { ActivityIndicator, View } from "react-native";
import styled from "styled-components/native";
import { LayoutContainer } from "../../LayoutContainer";
import { ExpressionDisplay } from "../ExpressionDisplay";
import { ExpressionHistoryMemo as ExpressionHistory } from "../history/ExpressionHistory";

export const Container: typeof View = styled(View)`
  padding: ${size.gap.default}px;
  padding-bottom: ${size.gap.large}px;
  align-items: center;
  gap: ${size.gap.large}px;
  padding: ${size.gap.default}px ${size.gap.large}px;
`;

export const Content: typeof LayoutContainer = styled(LayoutContainer)`
  flex: 1;
  padding: 0px ${size.gap.default}px;
`;

export const Current: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const History: typeof ExpressionHistory = styled(
	ExpressionHistory,
).attrs({
	contentContainerStyle: {
		flex: 1,
		paddingBottom: 10,
	},
})`
`;

export const HistoryContainer: typeof View = styled(View)`
  flex: 1;
`;

export const Loader: typeof ActivityIndicator = styled(ActivityIndicator).attrs(
	{
		color: color.dark10,
	},
)`
  padding: ${size.gap.default}px 0;
  flex: 1;
`;

export const Expression: typeof ExpressionDisplay = styled(
	ExpressionDisplay,
).attrs({
	expressionStyle: {
		justifyContent: "flex-end",
	},
})`
  justify-content: flex-end;
`;
