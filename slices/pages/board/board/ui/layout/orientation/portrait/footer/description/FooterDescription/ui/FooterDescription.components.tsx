import { FactionDescription } from "@modules/faction/shared/ui";
import { size } from "@shared/config";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import { TOP_CONTENT_OFFSET } from "../../../../../../../../config";
import {
	InvestigatorFlavor,
	InvestigatorText,
	InvestigatorTraits,
} from "../../../../../../../shared";
import { DescriptionMenu } from "../../DescriptionMenu";
import { FooterDescriptionExpandArea } from "../../FooterDescriptionExpandArea";
import { FooterTopContent } from "../../top";

export const Container: typeof Animated.View = styled(Animated.View)`
  position: relative;
 
`;

export const Background: typeof FactionDescription = styled(FactionDescription)`

`;

export const Content: typeof View = styled(View)`
`;

export const ExpandArea: typeof FooterDescriptionExpandArea = styled(
	FooterDescriptionExpandArea,
)`
	position: absolute;
	top: ${TOP_CONTENT_OFFSET}px;
	bottom: 0;
	left: 0;
	right: 0;
  z-index: 10;
`;

export const TopContent: typeof FooterTopContent = styled(FooterTopContent)`

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
