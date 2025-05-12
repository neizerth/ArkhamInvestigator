import { Pressable } from "@features/haptic";
import { View } from "react-native";
import styled from "styled-components/native";
import { DescriptionTopMenu } from "../../DescriptionTopMenu";
import { SecondaryControls } from "../SecondaryControls";

export const TOP_CONTENT_OFFSET = 178;

export const Container: typeof View = styled(View)`
  gap: 40px;
  min-height: ${TOP_CONTENT_OFFSET}px;
  justify-content: flex-end;
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
