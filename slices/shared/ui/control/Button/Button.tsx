import type { TouchableOpacityProps } from '@shared/ui/behavior';
import * as C from './Button.components';
import type { TextStyle } from 'react-native';

export type ButtonProps = TouchableOpacityProps & {
  text?: string
  textStyle?: TextStyle
  icon?: string
  iconStyle?: TextStyle
}

export const Button = ({
  text,
  textStyle,
  children,
  icon,
  iconStyle,
  ...props
}: ButtonProps) => {
  return (
    <C.Container {...props}>
      {icon && (
        <C.Icon style={iconStyle} icon={icon}/>
      )}
      {text && (
        <C.Text style={textStyle}>{text}</C.Text>
      )}
      {children}
    </C.Container>
  );
}