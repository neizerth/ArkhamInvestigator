import {
	ReferenceBackground,
	ReferenceSectionHeader,
	ReferenceTitle,
} from "@modules/mechanics/rules/base/shared/ui";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";
import { RoundReferencePhase } from "../phase";

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

export const ActivePhase: typeof ReferenceSectionHeader = styled(
	ReferenceSectionHeader,
).attrs({
	style: {
		position: "absolute",
		zIndex: 1,
		left: 0,
		right: 0,
		top: -7,
	},
})`
`;

export const TitleContent: typeof ReferenceTitle = styled(ReferenceTitle)`
  ${({ theme: { font, color } }) => css`
	font-size: ${font.size.large}px;
  color: ${color.title};
`}`;

export const Phases: typeof FlatList = styled(FlatList)`
  flex: 1;
`;

export const Phase: typeof RoundReferencePhase = styled(RoundReferencePhase)`

`;
