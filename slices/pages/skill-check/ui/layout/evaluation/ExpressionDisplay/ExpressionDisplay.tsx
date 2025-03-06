import { characters } from '@pages/skill-check/config';
import * as C from './ExpressionDisplay.components';
import { ViewProps } from 'react-native';

export type ExpressionDisplayProps = ViewProps
export const ExpressionDisplay = ({
  ...props
}: ExpressionDisplayProps) => {
  const expression = '3+4';
  return (
    <C.Container {...props}>
      <C.Expression>{expression}</C.Expression>
    </C.Container>
  );
}