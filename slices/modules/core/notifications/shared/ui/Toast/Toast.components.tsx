import { Alegreya } from "@assets/fonts";
import { GameText } from "@entities/game-text";
import { color, font, size } from "@shared/config";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import type { ToastType } from "react-native-toast-message";
import styled, { css } from "styled-components/native";

type ContainerProps = ViewProps & {
	type: ToastType;
};

const boarderColor: Record<ToastType, string> = {
	success: color.skill.agility.dark,
	error: color.skill.combat.dark,
	info: color.status.info,
};

export const Container: FC<ContainerProps> = styled(View)`
  max-width: 340px;
  min-height: 60px;
  justify-content: center;
  background-color: ${color.dark40};
  border-radius: ${size.borderRadius.default}px;
  padding: ${size.gap.small}px ${size.gap.large}px;
  border-left-width: ${size.gap.small}px;
  ${({ type }: ContainerProps) => css`
    border-left-color: ${boarderColor[type]};
  `}
`;

export const Text: typeof GameText = styled(GameText)`
  color: ${color.light10};
  font-family: ${Alegreya.regular};
  font-size: ${font.size.small}px;
`;

export const Text1 = styled(Text)`
  
`;

export const Text2 = styled(Text)`
  
`;
