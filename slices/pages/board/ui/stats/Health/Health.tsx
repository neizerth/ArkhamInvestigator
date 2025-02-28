import * as C from './Health.components';
import type { ViewProps } from 'react-native';

export type HealthProps = ViewProps

export const Health = ({
  ...props
}: HealthProps) => {
  return (
    <C.Container {...props}>
      <C.Background>

      </C.Background>
    </C.Container>
  );
}