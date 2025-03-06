import type { PropsWithChildren } from 'react';
import * as C from './KeyboardButton.components';
import type { TouchableOpacityProps } from '@shared/ui';
import type { KeyboardButtonProps } from './KeyboardButton.types';

export const KeyboardButton = ({
  children,
  textStyle,
  ...props
}: KeyboardButtonProps) => {
  const { size } = props;
  return (
    <C.Button {...props}>
      {(props.type === 'value' || !props.type) && (
        <C.Num 
          style={textStyle}
          char={typeof props.value === 'number'}
          size={size}
        >
          {props.value}
        </C.Num>
      )}
      {props.type === 'icon' && (
        <C.Icon icon={props.icon}/>
      )}
      {props.type === 'text' && (
        <C.Text style={textStyle}>{children}</C.Text>
      )}
      {props.type === 'custom' && children}
    </C.Button>
  );
}