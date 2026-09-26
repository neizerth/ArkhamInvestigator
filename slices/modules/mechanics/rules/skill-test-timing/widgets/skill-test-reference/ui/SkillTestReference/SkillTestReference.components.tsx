import {
	ReferenceBackground,
	ReferenceTitle,
} from "@modules/mechanics/rules/base/shared/ui";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import { SkillTestReferenceStep } from "../step";

export const Container: typeof ReferenceBackground = styled(
	ReferenceBackground,
)`
`;

export const Content: typeof View = styled(View)`
  flex: 1;
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const Title: typeof View = styled(View)`
  align-items: center;
`;

export const Body: typeof View = styled(View)`
  position: relative;
  flex: 1;
`;

export const TitleContent: typeof ReferenceTitle = styled(ReferenceTitle)`
  ${({ theme: { font, color } }) => css`
	font-size: ${font.size.large}px;
  color: ${color.title};
`}`;

export const Step: typeof SkillTestReferenceStep = styled(
	SkillTestReferenceStep,
)`
`;

export const Steps: typeof FlatList = styled(FlatList).attrs(({ theme }) => ({
	contentContainerStyle: {
		gap: theme.size.gap.default,
	},
}))`
  flex: 1;
`;
