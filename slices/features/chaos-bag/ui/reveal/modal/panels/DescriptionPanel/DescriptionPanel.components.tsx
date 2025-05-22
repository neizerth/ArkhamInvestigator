import { color, size } from "@shared/config";
import type { FC } from "react";
import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";
import { GameText } from "../../../../../../../widgets/game/game-text";
import type { TouchableOpacityProps } from "../../../../../../haptic";

type ContainerProps = TouchableOpacityProps & {
	last: boolean;
};

export const Container: FC<ContainerProps> = styled(TouchableOpacity)`
  margin: ${size.gap.default}px -25px 0;
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

export const Description: typeof GameText = styled(GameText).attrs({
	componentStyles: {
		paragraph: {
			justifyContent: "center",
		},
	},
})`
  color: ${color.light10};
`;
