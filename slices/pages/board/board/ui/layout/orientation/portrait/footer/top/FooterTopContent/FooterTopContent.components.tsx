import { Pressable } from "@features/haptic";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import { DescriptionTopMenu } from "../../DescriptionTopMenu";
import { SecondaryControls } from "../SecondaryControls";

export const Container: typeof Animated.View = styled(Animated.View)`
  gap: 60px;
`;

export const TopMenu: typeof DescriptionTopMenu = styled(DescriptionTopMenu)`

`;

export const ExpandArea: typeof Pressable = styled(Pressable).attrs({
	activeOpacity: 1,
})`
  z-index: 10;
`;

export const Secondary: typeof SecondaryControls = styled(SecondaryControls)`
  
`;
