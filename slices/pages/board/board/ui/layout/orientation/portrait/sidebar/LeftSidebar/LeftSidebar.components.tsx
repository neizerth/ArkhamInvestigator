import { IconButton, type TouchableOpacityProps } from "@features/haptic";
import { color } from "@shared/config";
import type { FC } from "react";
import { Dimensions, Platform, View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { assetsSize } from "../../../../../../config";

const ios = Platform.OS === "ios";

const screen = Dimensions.get("screen");

type ContainerProps = ViewProps & {
	single: boolean;
};

export const Container: FC<ContainerProps> = styled(View)`
  gap: 15px;
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

export const Button: typeof IconButton = styled(IconButton).attrs({
	iconStyle: {
		fontSize: 28,
		lineHeight: ios ? 28 : 30,
		color: color.white,
		textShadowColor: "rgba(0, 0, 0, 0.3)",
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 5,
	},
})`
  width: 60px;
  height: 48px;
  justify-content: center;
  align-items: center;
  ${({ disabled }: TouchableOpacityProps) =>
		disabled &&
		css`
    opacity: 0.5;
  `}
`;
