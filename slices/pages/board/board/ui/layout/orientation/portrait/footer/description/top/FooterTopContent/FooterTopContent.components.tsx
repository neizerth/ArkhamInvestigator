import { Pressable } from "@features/haptic";
import { View } from "react-native";
import styled from "styled-components/native";
import { TOP_CONTENT_OFFSET } from "../../../../../../../../config";
import { DescriptionTopMenu } from "../DescriptionTopMenu";
import { SecondaryControls } from "../SecondaryControls";

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
