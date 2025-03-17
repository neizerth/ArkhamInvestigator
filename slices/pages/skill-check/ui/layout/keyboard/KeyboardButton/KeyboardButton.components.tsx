import { color } from "@shared/config"
import { TouchableOpacity, Icon as BaseIcon } from "@shared/ui"
import type { FC } from "react"
import { Text as BaseText } from "react-native"
import styled, { css } from "styled-components/native"
import type { KeyboardButtonProps, KeyboardButtonType, ButtonTextProps } from "./KeyboardButton.types"
import { Copasetic } from "@shared/fonts"
import type { RuleSet } from "styled-components"


export const Button: FC<KeyboardButtonProps> = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
`

const textStyle: Record<KeyboardButtonType, RuleSet> = {
  primary: css`
    color: #d3b182;
  `,
  secondary: css`
    color: ${color.light10};
  `
}

export const Text: FC<ButtonTextProps> = styled(BaseText)`
 
  font-size: 50px;
  font-family: ${Copasetic.regular};
  ${({ buttonType = 'secondary'}: ButtonTextProps) => css`
    ${textStyle[buttonType]}
  `}
`

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: 25px;
  color: ${color.light10};
`
