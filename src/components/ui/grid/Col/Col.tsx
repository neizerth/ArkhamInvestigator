import { PropsWithChildren } from 'react';
import S from './Col.module.scss';
import { PropsWithClassName } from '@/types/ui';
import classNames from 'classnames';
import { Block } from '@/components';

export type ColProps = PropsWithChildren & PropsWithClassName;

export const Col = ({ 
  className,
  children 
}: ColProps) => {
  return (
    <Block
      className={classNames(
        S.container,
        className
      )}
    >
      {children}
    </Block>
  );
}