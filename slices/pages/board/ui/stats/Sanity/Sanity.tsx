import { View } from 'react-native-reanimated/lib/typescript/Animated';
import * as C from './Sanity.components';
import type { ViewProps } from 'react-native';

export type SanityProps = ViewProps

export const Sanity = ({
  ...props
}: SanityProps) => {
  return (
    <C.Container {...props}>
    </C.Container>
  );
}