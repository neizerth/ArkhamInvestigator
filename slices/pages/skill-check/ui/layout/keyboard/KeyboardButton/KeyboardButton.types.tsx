import type { TouchableOpacityProps } from "@shared/ui"
import { TextProps, TextStyle } from "react-native"

export type KeyboardButtonValue = {
  type?: 'value'
} | {
  type: 'icon'
  icon: string
} | {
  type: 'text'
} | {
  type: 'custom'
}

export type KeyboardButtonProps = TouchableOpacityProps & 
  KeyboardButtonValue & 
  PropsWithSize & 
  PropsWithType & {
    textStyle?: TextStyle
    value?: string | number
  }

export type KeyboardButtonSize = 'small' | 'medium' | 'large'

export type KeyboardButtonType = 'primary' | 'secondary'

export type PropsWithSize = {
  size?: KeyboardButtonSize
}

export type PropsWithType = {
  buttonType?: KeyboardButtonType
}


export type NumProps = TextProps & PropsWithSize & {
  char: boolean
}
