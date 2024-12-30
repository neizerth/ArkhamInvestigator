import { PropsWithChildren } from 'react';
import S from './Row.module.scss';
import { PropsWithClassName } from '@/types/ui';
import classNames from 'classnames';
import { Block } from '@/components';

export type RowProps = PropsWithChildren & PropsWithClassName

export const Row = ({ 
  className,
  children 
}: RowProps) => {
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