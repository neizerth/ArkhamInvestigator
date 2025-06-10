import { GameText } from "@entities/game-text";
import { Pressable, type PressableProps } from "@modules/haptic/widgets";
import { color, font, size } from "@shared/config";
import type { FC } from "react";
import styled, { css } from "styled-components/native";

type ContainerProps = PressableProps & {
	last: boolean;
};

export const Container: FC<ContainerProps> = styled(Pressable)`
  margin: ${size.gap.default}px -35px 0;
  padding: ${size.gap.default}px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: ${size.borderRadius.default}px;
  align-items: center;
  ${({ last }: ContainerProps) =>
		!last &&
		css`
      border: 1px solid rgba(212, 175, 55, 0.8);
  `}
`;

export const Effect: typeof GameText = styled(GameText).attrs({
	componentStyles: {
		paragraph: {
			justifyContent: "center",
		},
	},
})`
  font-size: ${font.size.small}px;
  color: ${color.light10};
`;
