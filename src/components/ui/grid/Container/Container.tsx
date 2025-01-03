import { Block } from '@/components';
import S from './Container.module.scss';
import { BlockProps } from '../../common/Block/Block';

export type ContainerProps = BlockProps;

export const Container = ({ children }: ContainerProps) => {
  return (
    <Block className={S.container}>{children}</Block>
  );
}