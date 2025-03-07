import * as C from './KeyboardButton.components';
import type { IconButtonProps } from '@shared/ui';
import type { CustomButtonProps, KeyboardButtonProps, TextButtonProps } from './KeyboardButton.types';
import { useWindowDimensions } from 'react-native';
import { getButtonStyle, getTextStyle } from './KeyboardButton.styles';
import { useButtonStyles } from './useButtonStyles';

export type { KeyboardButtonProps, CustomButtonProps, IconButtonProps, TextButtonProps };

export const IconButton = ({
  icon,
  ...props
}: IconButtonProps) => {
  const style = useButtonStyles();
  return (
    <C.Button 
      {...props}
      style={[
        props.style,
        style.button
      ]}
    >
      <C.Icon icon={icon}/>
    </C.Button>
  )
}

export const TextButton = ({
  children,
  textStyle,
  ...props
}: TextButtonProps) => {
  const { size, buttonType } = props;
  const style = useButtonStyles(size);
  return (
    <C.Button 
      {...props}
      style={[
        props.style,
        style.button
      ]}
    >
       <C.Text 
          style={[
            textStyle,
            style.text
          ]}
          size={size}
          buttonType={buttonType}
        >
          {children}
        </C.Text>
    </C.Button>
  )
}

export const CustomButton = ({
  ...props
}: CustomButtonProps) => {
  const style = useButtonStyles(props.size);
  return (
    <C.Button 
      {...props}
      style={[
        props.style,
        style.button
      ]}
    />
  )
}