import { TouchableOpacity, type TouchableOpacityProps } from "@features/haptic";
import type { PropsWithUnit } from "@shared/model";
import { type DefinedIconProps, Icon } from "@shared/ui";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { assetsSize } from "../../../../../../config";

type ContainerProps = ViewProps &
	PropsWithUnit & {
		single: boolean;
	};

const isHistoryInColumn = (unit: number) => unit > 340;

export const Container: FC<ContainerProps> = styled(View)`
  gap: 35px;
  justify-content: flex-end;
  align-items: center;
  min-width: ${assetsSize.main}px;
  ${({ unit }: ContainerProps) =>
		!isHistoryInColumn(unit) &&
		css`
    align-items: flex-start;
    padding-bottom: 50px;
  `}
  ${({ single }: ContainerProps) =>
		single &&
		css`
    align-items: center;
    padding-bottom: 50px;
  `}
`;

type HistoryProps = ContainerProps & PropsWithUnit;

export const History: FC<HistoryProps> = styled(View)`
  gap: 35px;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  ${({ single, unit }: HistoryProps) => {
		if (single || isHistoryInColumn(unit)) {
			return;
		}

		return css`
      flex-direction: row;
    `;
	}}
`;

export const HistoryIcon: typeof Icon = styled(Icon)`
  font-size: 30px;
  color: white;
`;

export const HistoryButton: typeof TouchableOpacity = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  ${({ disabled }: TouchableOpacityProps) =>
		disabled &&
		css`
    opacity: 0.8;
  `}
`;

export const Undo: FC<DefinedIconProps> = styled(Icon).attrs({
	icon: "undo",
})`
    font-size: 30px;
    color: white;
  `;

export const Redo: FC<DefinedIconProps> = styled(Icon).attrs({
	icon: "redo",
})`
    font-size: 30px;
    color: white;
  `;
