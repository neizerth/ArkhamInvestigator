import { TouchableOpacityProps } from "@shared/ui/behavior";

export type PrimaryButtonStyle = 'default' | 'transparent' | 'square';

export type PrimaryButtonProps = TouchableOpacityProps & PropsWithStyleType

export type PropsWithStyleType = {
  styleType?: PrimaryButtonStyle
}