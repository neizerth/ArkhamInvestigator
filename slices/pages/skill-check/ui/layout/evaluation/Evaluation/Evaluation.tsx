import type { ViewProps } from 'react-native';
import * as C from './Evaluation.components';
import { ExpressionDisplay } from '../ExpressionDisplay';
import { ExpressionValue } from '../ExpressionValue';
import { ExpressionHistory } from '../ExpressionHistory';
import { selectHistoryShown, selectSkillCheckData, useAppSelector } from '@shared/lib';

export type EvaluationProps = ViewProps

export const Evaluation = ({
  ...props
}: EvaluationProps) => {
  const data = useAppSelector(selectSkillCheckData);
  const historyShown = useAppSelector(selectHistoryShown);

  const expressionData = data;

  const historySize = historyShown ? Number.POSITIVE_INFINITY : 1;
  return (
    <C.Container {...props}>
      <C.Content>
        <ExpressionHistory size={historySize}/>
        <C.Current>
          <ExpressionDisplay 
            data={expressionData}
            type="primary"
          />
          <ExpressionValue/>
        </C.Current>
      </C.Content>
    </C.Container>
  );
}