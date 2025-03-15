import { TouchableOpacityProps } from "../../behavior";

export type PrimaryButtonStyle = 'default' | 'transparent' | 'square';

export type PrimaryButtonSize = 'default' | 'small';

export type PrimaryButtonProps = TouchableOpacityProps & PropsWithStyleType

export type PropsWithStyleType = {
  styleType?: PrimaryButtonStyle
  size?: PrimaryButtonSize
}