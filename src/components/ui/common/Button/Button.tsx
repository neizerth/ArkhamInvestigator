import { ComponentProps } from 'react';
import S from './Button.module.scss';
import classNames from 'classnames';

export type ButtonProps = ComponentProps<'button'>;

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(
        S.container,
        props.className
      )}
    />
  );
}