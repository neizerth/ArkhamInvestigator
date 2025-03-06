import type { ViewProps } from 'react-native';
import * as C from './Evaluation.components';
import { ExpressionDisplay } from '../ExpressionDisplay';
import { ExpressionValue } from '../ExpressionValue';
import { ExpressionHistory } from '../ExpressionHistory';

export type EvaluationProps = ViewProps

export const Evaluation = ({
  ...props
}: EvaluationProps) => {
  return (
    <C.Container {...props}>
      <ExpressionHistory/>
      <C.Current>
        <ExpressionDisplay/>
        <ExpressionValue/>
      </C.Current>
    </C.Container>
  );
}