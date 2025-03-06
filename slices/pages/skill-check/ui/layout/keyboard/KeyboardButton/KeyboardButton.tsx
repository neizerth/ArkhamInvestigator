import * as C from './KeyboardButton.components';
import type { IconButtonProps } from '@shared/ui';
import type { CustomButtonProps, KeyboardButtonProps, TextButtonProps } from './KeyboardButton.types';

export type { KeyboardButtonProps, CustomButtonProps, IconButtonProps, TextButtonProps };

export const IconButton = ({
  icon,
  ...props
}: IconButtonProps) => {
  return (
    <C.Button {...props}>
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
  return (
    <C.Button {...props}>
       <C.Text 
          style={textStyle}
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
  return (
    <C.Button {...props}/>
  )
}