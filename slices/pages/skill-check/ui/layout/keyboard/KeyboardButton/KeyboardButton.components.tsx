import { color } from "@shared/config"
import { AtlanticCruise } from "@shared/fonts/AtlanticCruise"
import { TouchableOpacity, Icon as BaseIcon } from "@shared/ui"
import type { FC } from "react"
import { Text as BaseText } from "react-native"
import styled, { css } from "styled-components/native"
import type { KeyboardButtonProps, KeyboardButtonSize, KeyboardButtonType, ButtonTextProps } from "./KeyboardButton.types"
import { Copasetic } from "@shared/fonts/Copasetic"
import type { RuleSet } from "styled-components"

type SizeRecord = Record<KeyboardButtonSize, number>;

const buttonSize: SizeRecord = {
  small: 38,
  medium: 65,
  large: 100,
} 

const DEFAULT_SIZE: KeyboardButtonSize = 'medium';  

export const Button: FC<KeyboardButtonProps> = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  ${({ size = DEFAULT_SIZE }: KeyboardButtonProps) => css`
    width: ${buttonSize[size]}px;
    height: ${buttonSize[size]}px;
  `}
`
const textSize: SizeRecord = {
  small: 40,
  medium: 48,
  large: 80,
}

const textStyle: Record<KeyboardButtonType, RuleSet> = {
  primary: css`
    color: ${color.light10}
  `,
  secondary: css`
    color: ${color.dark15};
  `
}

export const Text: FC<ButtonTextProps> = styled(BaseText)`
 
  font-size: 50px;
  font-family: ${Copasetic.regular};
  ${
    ({ 
        buttonType = 'secondary', 
        size = DEFAULT_SIZE 
      }: ButtonTextProps
    ) => css`
      font-size: ${textSize[size]}px;
      ${textStyle[buttonType]}
    `}
`

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: 25px;
  color: ${color.light10};
`
