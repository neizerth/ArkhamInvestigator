import { ChaosToken } from "@modules/chaos-bag/base/shared/ui";
import { ContextModal } from "@modules/core/modal/shared/base/ui";
import {
	ScenarioDifficultySelect,
	ScenarioDifficultyTokens,
} from "@modules/stories/entities/ui";
import { Button } from "@shared/ui";
import { Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof ContextModal = styled(ContextModal).attrs(
	({ theme }) => ({
		contentStyle: {
			backgroundColor: theme.color.dark30,
			paddingRight: theme.size.gap.small,
			paddingLeft: theme.size.gap.small,
		},
	}),
)`
  flex: 1;
  justify-content: flex-start;
`;

export const Select: typeof ScenarioDifficultySelect = styled(
	ScenarioDifficultySelect,
)`
`;

export const Content: typeof View = styled(View)`
  gap: ${({ theme }) => theme.size.gap.default}px
`;

export const Preview: typeof ScenarioDifficultyTokens = styled(
	ScenarioDifficultyTokens,
)`
`;

export const Token: typeof ChaosToken = styled(ChaosToken)`
  
`;

export const Actions: typeof Row = styled(Row)`
  gap: ${({ theme }) => theme.size.gap.default}px
`;

export const Action: typeof Button = styled(Button)`
  flex: 1;
`;

export const Cancel: typeof Action = styled(Action)`
  background-color: ${({ theme }) => theme.color.dark20};
`;

export const Ok: typeof Action = styled(Action).attrs(({ theme }) => ({
	textStyle: {
		color: theme.color.text,
	},
	iconStyle: {
		color: theme.color.text,
	},
}))`
  background-color: ${({ theme }) => theme.color.light10};
`;
