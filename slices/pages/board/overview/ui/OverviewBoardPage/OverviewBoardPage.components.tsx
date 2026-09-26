import { ContextModal } from "@modules/core/modal/shared/base/ui";
import { Row } from "@shared/ui";
import { ArrowButton } from "@shared/ui/control/button/ArrowButton";
import { Platform, View } from "react-native";
import { ActivityIndicator } from "react-native";
import styled, { css } from "styled-components/native";
import { OverviewInvestigator } from "../OverviewInvestigator";

const ios = Platform.OS === "ios";

export const Container: typeof ContextModal = styled(ContextModal).attrs(
	({ theme }) => ({
		contentStyle: {
			backgroundColor: theme.color.dark30,
		},
	}),
)`
  flex: 1;
  ${ios && "justify-content: flex-start;"}
`;

export const Content: typeof View = styled(View)`
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const Board: typeof OverviewInvestigator = styled(OverviewInvestigator)`
  
`;

export const List: typeof View = styled(View)`
  
`;

export const Separator: typeof View = styled(View)`
  ${({ theme: { color, size } }) => css`
  border-top-width: 1px;
  border-top-color: ${color.dark10};
  margin: 0 ${size.gap.small}px;
`}`;

export const Item: typeof View = styled(View)`
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const Loader: typeof ActivityIndicator = styled(ActivityIndicator).attrs(
	({ theme }) => ({
		color: theme.color.dark10,
	}),
)`
  height: 432px;
	padding: ${({ theme }) => theme.size.gap.default}px 0;
  justify-content: center;
`;

export const Button: typeof ArrowButton = styled(ArrowButton)`
  flex: 1;
`;

export const Actions: typeof Row = styled(Row)`
  gap: ${({ theme }) => theme.size.gap.default}px;
`;
