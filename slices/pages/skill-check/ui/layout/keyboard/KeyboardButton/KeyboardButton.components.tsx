import { color } from "@shared/config"
import { AtlanticCruise } from "@shared/fonts/AtlanticCruise"
import { TouchableOpacity, Icon as BaseIcon } from "@shared/ui"
import { FC } from "react"
import { Text as BaseText } from "react-native"
import styled, { css } from "styled-components/native"
import { KeyboardButtonProps, KeyboardButtonSize, KeyboardButtonType, NumProps } from "./KeyboardButton.types"
import { Copasetic } from "@shared/fonts/Copasetic"
import { keyboardColor } from "@pages/skill-check/config"

type SizeRecord = Record<KeyboardButtonSize, number>;

const buttonColor: Record<KeyboardButtonType, string> = {
  primary: color.dark30,
  secondary: color.light10
} 

const buttonSize: SizeRecord = {
  small: 40,
  medium: 70,
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
  ${({ buttonType }: KeyboardButtonProps) => buttonType && css`
    background-color: ${buttonColor[buttonType]};
  `}
`
const textSize: SizeRecord = {
  small: 50,
  medium: 60,
  large: 80,
} 

export const Num: FC<NumProps> = styled(BaseText)`
  color: ${color.dark15};
  font-size: 50px;
  font-family: ${Copasetic.regular};
  ${({ char, size = DEFAULT_SIZE }: NumProps) => !char && css`
    color: ${color.light10};
    font-size: ${textSize[size]}px;
  `}
`

export const Icon: typeof BaseIcon = styled(BaseIcon)`
  font-size: 30px;
  color: ${color.light10};
`

export const Text: typeof BaseText = styled(BaseText)`
  font-size: 40px;
  color: ${color.light10};
  font-family: ${Copasetic.regular};
`