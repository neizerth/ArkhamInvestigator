import { boardText } from "@pages/board/config";
import {
	InvestigatorFlavor,
	InvestigatorText,
	InvestigatorTextProps,
	InvestigatorTraits,
} from "@pages/board/ui/shared/text";
import { color, size } from "@shared/config";
import { type DefinedIconButtonProps, IconButton } from "@shared/ui";
import type { FC } from "react";
import { Pressable, View, type ViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import styled, { css } from "styled-components/native";
import { FactionDescription } from "../../../../../shared/background";
import { DescriptionMenu } from "../DescriptionMenu";

export const Container: typeof View = styled(View)`
  position: relative;
 
`;

export const Background: typeof FactionDescription = styled(FactionDescription)`

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

export const Exit: FC<DefinedIconButtonProps> = styled(IconButton).attrs({
	icon: "resign",
	iconStyle: {
		color: color.light10,
		fontSize: 30,
	},
})`
    position: absolute;
    left: 0px;
    top: -60px;
  `;

export const Clear: FC<DefinedIconButtonProps> = styled(IconButton).attrs({
	icon: "repeat",
	iconStyle: {
		color: color.light10,
		fontSize: 30,
	},
})`
    position: absolute;
    right: 5px;
    top: -60px;
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

export const Flavor: typeof InvestigatorFlavor = styled(InvestigatorFlavor)`
  margin-top: 25px;
`;

export { InvestigatorText as Text };
