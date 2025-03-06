import { View } from 'react-native-reanimated/lib/typescript/Animated';
import * as C from './Sanity.components';
import type { ViewProps } from 'react-native';
import { selectCurrentBoard, useAppSelector } from '@shared/lib';

export type SanityProps = ViewProps

export const Sanity = ({
  ...props
}: SanityProps) => {
  const { value } = useAppSelector(selectCurrentBoard);

  return (
    <C.Container {...props}>
      <C.Value value={value.sanity}/>
    </C.Container>
  );
}