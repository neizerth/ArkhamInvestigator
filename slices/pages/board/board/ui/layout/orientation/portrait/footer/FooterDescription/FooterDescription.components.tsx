import { size } from "@shared/config";
import { StorePressable } from "@widgets/control/store-pressable";
import { InvestigatorDescription } from "@widgets/game/investigator";
import type { FC } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import styled, { css } from "styled-components/native";
import {
	InvestigatorFlavor,
	InvestigatorText,
	InvestigatorTraits,
} from "../../../../../shared";
import { DescriptionMenu } from "../DescriptionMenu";
import { FooterTopContent, type FooterTopContentProps } from "../top";

export const Container: typeof Animated.View = styled(Animated.View)`
  position: relative;
 
`;

export const Background: typeof InvestigatorDescription = styled(
	InvestigatorDescription,
)`

`;

export const Content: typeof View = styled(View)`
`;

export const ExpandArea: typeof StorePressable = styled(StorePressable).attrs({
	activeOpacity: 1,
})`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
  z-index: 10;
`;

type TopContentProps = FooterTopContentProps & {
	show: boolean;
};

export const TopContent: FC<TopContentProps> = styled(FooterTopContent)`
  opacity: 0;
  ${({ show }: TopContentProps) =>
		show &&
		css`
    opacity: 1;
  `}
`;

export const TextContent: typeof ScrollView = styled(ScrollView)`
  flex: 1;
`;

export const DescriptionContent: typeof View = styled(View)`
  flex: 1;
  justify-content: space-between;
`;

export const Description: typeof Animated.View = styled(Animated.View)`
	
`;

export const Menu: typeof DescriptionMenu = styled(DescriptionMenu)`

`;

export const Traits: typeof InvestigatorTraits = styled(InvestigatorTraits)`
  margin-bottom: ${size.gap.small}px;
`;

export const Flavor: typeof InvestigatorFlavor = styled(
	InvestigatorFlavor,
).attrs({
	contentContainerStyle: {
		marginTop: 25,
	},
})`
`;

export const Text: typeof InvestigatorText = styled(InvestigatorText)`
  position: relative;
`;
