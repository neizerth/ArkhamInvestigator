import { TouchableOpacity } from "@features/haptic";
import { color } from "@shared/config";
import { Copasetic } from "@shared/fonts";
import { Icon as BaseIcon, UnscaledText } from "@shared/ui";
import type { FC } from "react";
import type { RuleSet } from "styled-components";
import styled, { css } from "styled-components/native";
import { skillCheckColor } from "../../../../config";
import type {
	ButtonTextProps,
	KeyboardButtonProps,
	KeyboardButtonType,
} from "./KeyboardButton.types";

export const Button: FC<KeyboardButtonProps> = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`;

const textStyle: Record<KeyboardButtonType, RuleSet> = {
	primary: css`
    color: ${skillCheckColor.button.primary};
  `,
	secondary: css`
    color: ${skillCheckColor.button.secondary};
  `,
};

export const Text: FC<ButtonTextProps> = styled(UnscaledText)`
 
  font-size: 50px;
  font-family: ${Copasetic.regular};
  ${({ buttonType = "secondary" }: ButtonTextProps) => css`
    ${textStyle[buttonType]}
  `}
`;

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: 25px;
  color: ${color.light10};
`;
