import { Pressable } from "@features/haptic";
import { View } from "react-native";
import styled from "styled-components/native";
import { DescriptionTopMenu } from "../../DescriptionTopMenu";
import { SecondaryControls } from "../SecondaryControls";

export const TOP_CONTENT_OFFSET = 178;

export const Container: typeof View = styled(View)`
  min-height: ${TOP_CONTENT_OFFSET}px;
  justify-content: flex-end;
`;

export const TopMenu: typeof DescriptionTopMenu = styled(DescriptionTopMenu)`

`;

export const ExpandArea: typeof Pressable = styled(Pressable)`
  flex: 1;
`;

export const Secondary: typeof SecondaryControls = styled(SecondaryControls)`
  margin-bottom: 40px;
`;
