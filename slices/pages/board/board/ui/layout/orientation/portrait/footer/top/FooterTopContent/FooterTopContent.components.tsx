import { Pressable } from "@features/haptic";
import { View } from "react-native";
import styled from "styled-components/native";
import { DescriptionTopMenu } from "../../DescriptionTopMenu";
import { SecondaryControls } from "../SecondaryControls";

export const Container: typeof View = styled(View)`
  gap: 40px;
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
