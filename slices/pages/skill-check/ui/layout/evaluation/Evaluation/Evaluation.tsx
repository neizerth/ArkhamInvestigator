import type { ViewProps } from 'react-native';
import * as C from './Evaluation.components';
import { ExpressionDisplay } from '../ExpressionDisplay';
import { ExpressionValue } from '../ExpressionValue';

export type EvaluationProps = ViewProps

export const Evaluation = ({
  ...props
}: EvaluationProps) => {
  return (
    <C.Container {...props}>
      <ExpressionDisplay/>
      <ExpressionValue/>
    </C.Container>
  );
}