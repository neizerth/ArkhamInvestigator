import type { TouchableOpacityProps } from '@shared/ui/behavior';
import * as C from './Button.components';
import type { TextStyle } from 'react-native';

export type ButtonProps = TouchableOpacityProps & {
  text?: string
  textStyle?: TextStyle
}

export const Button = ({
  text,
  textStyle,
  children,
  ...props
}: ButtonProps) => {
  return (
    <C.Container {...props}>
      {text && (
        <C.Text style={textStyle}>{text}</C.Text>
      )}
      {children}
    </C.Container>
  );
}