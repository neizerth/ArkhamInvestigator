import { ChaosTokenPreview } from "@modules/chaos-bag/base/shared/ui";
import { Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";
import { SidebarIconButton } from "../../../../SidebarIconButton";
import { ChaosBagButtonLastRevealIcon } from "../ChaosBagButtonLastRevealIcon";

export const Container: typeof View = styled(View)`
  position: relative;
`;

export const LastReveal: typeof ChaosBagButtonLastRevealIcon = styled(
	ChaosBagButtonLastRevealIcon,
)`
  position: absolute;
  right: -5px;
  top: -10px;
`;

export const Button: typeof SidebarIconButton = styled(SidebarIconButton)`
  
`;

export const SealedTokenGroups: typeof Row = styled(Row)`
  position: absolute;
  right: 0;
  left: 0;
  bottom: -22px;
  justify-content: space-between;
`;

export const Token: typeof ChaosTokenPreview = styled(ChaosTokenPreview).attrs({
	tokenPadding: 1,
	sealOffset: 2,
})`

`;
