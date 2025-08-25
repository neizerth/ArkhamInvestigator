import { Pressable } from "@modules/core/touch/shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { TOP_CONTENT_OFFSET } from "../../../../../../../../config";
import { BoardDescriptionSecondaryControls } from "../BoardDescriptionSecondaryControls";
import { BoardDescriptionTopMenu } from "../BoardDescriptionTopMenu";

export const Container: typeof View = styled(View)`
  min-height: ${TOP_CONTENT_OFFSET}px;
  justify-content: flex-end;
`;

export const TopMenu: typeof BoardDescriptionTopMenu = styled(
	BoardDescriptionTopMenu,
)`
  
`;

export const ExpandArea: typeof Pressable = styled(Pressable)`
  flex: 1;
`;

export const Secondary: typeof BoardDescriptionSecondaryControls = styled(
	BoardDescriptionSecondaryControls,
)`
  margin-bottom: 40px;
`;
