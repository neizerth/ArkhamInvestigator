import { View } from "react-native";
import styled from "styled-components/native";
import { assetsSize } from "../../../../../../../config";
import { SidebarIconButton } from "../../SidebarIconButton";
import { ChaosBagButton } from "../button";

export const Container: typeof View = styled(View)`
  justify-content: flex-end;
  align-items: flex-start;
  min-width: ${assetsSize.main}px;
`;

export const Group: typeof View = styled(View)`
  gap: 15px;
  align-items: flex-start;
  padding-left: 10px;
`;

export const HistoryGroup: typeof Group = styled(Group)`
  gap: 15px;
  align-items: flex-start;
  padding-left: 10px;
`;

export const Buttons: typeof View = styled(View)`
  gap: 10px;
  justify-content: flex-end;
`;

export const Button: typeof SidebarIconButton = styled(SidebarIconButton)`
`;

export const ChaosBag: typeof ChaosBagButton = styled(ChaosBagButton)`
  
`;
