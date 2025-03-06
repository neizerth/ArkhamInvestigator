import * as C from './Resources.components';
import type { ViewProps } from 'react-native';
import { selectCurrentBoard, useAppSelector } from '@shared/lib';

export type ResourcesProps = ViewProps

export const Resources = ({
  ...props
}: ResourcesProps) => {
  const { value } = useAppSelector(selectCurrentBoard);
  return (
    <C.Container {...props}>
      <C.Value value={value.resources}/>
    </C.Container>
  );
}