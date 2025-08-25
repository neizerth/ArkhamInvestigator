import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { assetsSize } from "../../../../../../../config";
import { InvestigatorSelect } from "../../../../../../shared";
import { SidebarIconButton } from "../../SidebarIconButton";
import { ChaosBagButton } from "../button";

type ContainerProps = ViewProps & {
	single: boolean;
};

export const Container: FC<ContainerProps> = styled(View)`
  justify-content: flex-end;
  align-items: flex-start;
  min-width: ${assetsSize.main}px;
  ${({ single }: ContainerProps) =>
		single &&
		css`
    padding-bottom: 5px;
  `}
`;

export const Group: typeof View = styled(View)`
  gap: 15px;
  align-items: flex-start;
  padding-left: 10px;
`;

type HistoryGroupProps = ViewProps & {
	compact?: boolean;
};

export const HistoryGroup: FC<HistoryGroupProps> = styled(Group)`
  gap: 15px;
  align-items: flex-start;
  padding-left: 10px;
  ${({ compact }: HistoryGroupProps) =>
		compact &&
		css`
    flex-direction: row;
  `}
`;

export const Buttons: FC<ContainerProps> = styled(View)`
  gap: 10px;
  justify-content: flex-end;
  ${({ single }: ContainerProps) =>
		single &&
		css`
      gap: 20px;
    `}
`;

export const Button: typeof SidebarIconButton = styled(SidebarIconButton)`
`;

export const ChaosBag: typeof ChaosBagButton = styled(ChaosBagButton)`
  
`;

export const BoardSelect: typeof InvestigatorSelect = styled(
	InvestigatorSelect,
)`
  margin-bottom: -30px;
`;
