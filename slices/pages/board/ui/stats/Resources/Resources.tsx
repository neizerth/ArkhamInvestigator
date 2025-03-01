import { selectBoard } from '@pages/board/lib';
import * as C from './Resources.components';
import type { ViewProps } from 'react-native';
import { useAppSelector } from '@shared/lib';

export type ResourcesProps = ViewProps

export const Resources = ({
  ...props
}: ResourcesProps) => {
  const { value } = useAppSelector(selectBoard);
  return (
    <C.Container {...props}>
      <C.Value value={value.resources}/>
    </C.Container>
  );
}