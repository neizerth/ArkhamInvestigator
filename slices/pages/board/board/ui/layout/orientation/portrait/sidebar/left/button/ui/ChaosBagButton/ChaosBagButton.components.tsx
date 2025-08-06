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
