import type { SkillCheckOperator } from "@shared/model"
import type { TouchableOpacityProps } from "@shared/ui"
import type { TextProps, TextStyle } from "react-native"

export type KeyboardButtonProps = TouchableOpacityProps &  
  PropsWithSize & 
  PropsWithType & {
    value?: number | string
    operator?: SkillCheckOperator
  }

export type IconButtonProps = KeyboardButtonProps & {
  icon: string
}

export type TextButtonProps = KeyboardButtonProps & {
  textStyle?: TextStyle
}

export type CustomButtonProps = KeyboardButtonProps;

export type KeyboardButtonSize = 'small' | 'medium' | 'large'

export type KeyboardButtonType = 'primary' | 'secondary'

export type PropsWithSize = {
  size?: KeyboardButtonSize
}

export type PropsWithType = {
  buttonType?: KeyboardButtonType
}


export type ButtonTextProps = TextProps & PropsWithSize & PropsWithType;
