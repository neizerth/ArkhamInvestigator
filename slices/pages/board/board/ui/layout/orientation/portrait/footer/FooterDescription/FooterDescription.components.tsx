import { size } from "@shared/config";
import { InvestigatorDescription } from "@widgets/game/investigator";
import { Pressable, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import {
	InvestigatorFlavor,
	InvestigatorText,
	InvestigatorTraits,
} from "../../../../../shared";
import { DescriptionMenu } from "../DescriptionMenu";
import { DescriptionTopMenu } from "../DescriptionTopMenu";

export const Container: typeof View = styled(View)`
  position: relative;
 
`;

export const Background: typeof InvestigatorDescription = styled(
	InvestigatorDescription,
)`

`;

export const Content: typeof View = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  bottom: 0;
`;

export const Expand: typeof Animated.View = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  bottom: 0;
`;

export const ExpandArea: typeof Pressable = styled(Pressable).attrs({
	activeOpacity: 1,
})`
    z-index: 10;
  `;

export const TopMenu: typeof DescriptionTopMenu = styled(DescriptionTopMenu)`
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: -48px;
`;

export const TextContent: typeof ScrollView = styled(ScrollView)`
  flex: 1;
`;

export const DescriptionContent: typeof View = styled(View)`
  flex: 1;
  justify-content: space-between;
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
