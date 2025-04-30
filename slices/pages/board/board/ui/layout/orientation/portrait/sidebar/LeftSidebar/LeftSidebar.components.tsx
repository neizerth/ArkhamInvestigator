import { IconButton, type TouchableOpacityProps } from "@features/haptic";
import { color } from "@shared/config";
import type { PropsWithUnit } from "@shared/model";
import type { FC } from "react";
import { Platform, View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { assetsSize } from "../../../../../../config";

const ios = Platform.OS === "ios";

type ContainerProps = ViewProps &
	PropsWithUnit & {
		single: boolean;
	};

const isHistoryInColumn = (unit: number) => unit > 340;

export const Container: FC<ContainerProps> = styled(View)`
  gap: 15px;
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
    padding-bottom: 5px;
  `}
`;

type HistoryProps = ContainerProps & PropsWithUnit;

export const Buttons: FC<HistoryProps> = styled(View)`
  gap: 10px;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  ${({ single }: HistoryProps) =>
		single &&
		css`
      gap: 25px;
    `}
  ${({ single, unit }: HistoryProps) => {
		if (single || isHistoryInColumn(unit)) {
			return;
		}

		return css`
      flex-direction: row;
    `;
	}}
`;

export const Button: typeof IconButton = styled(IconButton).attrs({
	iconStyle: {
		fontSize: 28,
		lineHeight: ios ? 28 : 30,
		color: color.white,
	},
})`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  ${({ disabled }: TouchableOpacityProps) =>
		disabled &&
		css`
    opacity: 0.5;
  `}
`;
