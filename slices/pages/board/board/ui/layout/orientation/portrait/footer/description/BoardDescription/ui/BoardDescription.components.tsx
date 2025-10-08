import {
	InvestigatorFlavor,
	InvestigatorText,
	InvestigatorTraits,
} from "@modules/board/base/entities/typography/ui";
import type { InvestigatorTraitsProps } from "@modules/board/base/entities/typography/ui/InvestigatorTraits/InvestigatorTraits.types";
import { FactionDescription } from "@modules/faction/shared/ui";
import { size } from "@shared/config";
import type { FC } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import styled, { css } from "styled-components/native";
import { TOP_CONTENT_OFFSET } from "../../../../../../../../config";
import { BoardDescriptionExpandArea } from "../../BoardDescriptionExpandArea";
import { BoardDescriptionMenu } from "../../BoardDescriptionMenu";
import { BoardDescriptionTopContent } from "../../top";

export const Container: typeof Animated.View = styled(Animated.View)`
  position: relative;
 
`;

export const Background: typeof FactionDescription = styled(FactionDescription)`

`;

export const Content: typeof View = styled(View)`
`;

export const ExpandArea: typeof BoardDescriptionExpandArea = styled(
	BoardDescriptionExpandArea,
)`
	position: absolute;
	top: ${TOP_CONTENT_OFFSET}px;
	bottom: 0;
	left: 0;
	right: 0;
  z-index: 10;
`;

export const TopContent: typeof BoardDescriptionTopContent = styled(
	BoardDescriptionTopContent,
)`

`;

export const TextContent: typeof View = styled(View)`
  flex: 1;
`;

export const DescriptionContent: typeof View = styled(View)`
  flex: 1;
  justify-content: space-between;
`;

export const Description: typeof Animated.View = styled(Animated.View)`
	
`;

export const Menu: typeof BoardDescriptionMenu = styled(BoardDescriptionMenu)`

`;

type TraitsProps = InvestigatorTraitsProps & {
	compact: boolean;
};

export const Traits: FC<TraitsProps> = styled(InvestigatorTraits)`
  ${({ compact }: TraitsProps) =>
		!compact &&
		css`
    margin-top: 5px;
  `}
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
