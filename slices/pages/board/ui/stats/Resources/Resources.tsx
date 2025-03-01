import * as C from './Resources.components';
import type { ViewProps } from 'react-native';

export type ResourcesProps = ViewProps

export const Resources = ({
  ...props
}: ResourcesProps) => {
  return (
    <C.Container {...props}>
    </C.Container>
  );
}