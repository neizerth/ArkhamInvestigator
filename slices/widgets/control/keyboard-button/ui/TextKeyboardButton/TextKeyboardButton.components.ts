import { Copasetic } from "@assets/fonts";
import { UnscaledText, type UnscaledTextProps } from "@shared/ui";
import type { FC } from "react";
import type { RuleSet } from "styled-components";
import styled, { css } from "styled-components/native";
import { keyboardButtonColor } from "../../config";
import type {
	KeyboardButtonType,
	PropsWithKeyboardSize,
	PropsWithKeyboardType,
} from "../../model";
import { KeyboardButtonContainer } from "../KeyboardButtonContainer";

export const Container: typeof KeyboardButtonContainer = styled(
	KeyboardButtonContainer,
)`
`;

const textStyle: Record<KeyboardButtonType, RuleSet> = {
	primary: css`
    color: ${keyboardButtonColor.primary};
  `,
	secondary: css`
    color: ${keyboardButtonColor.secondary};
  `,
};

export type TextProps = UnscaledTextProps &
	PropsWithKeyboardSize &
	PropsWithKeyboardType;

export const Text: FC<TextProps> = styled(UnscaledText)`
  font-size: 50px;
  font-family: ${Copasetic.regular};
  ${({ buttonType = "secondary" }: TextProps) => css`
    ${textStyle[buttonType]}
  `}
`;
