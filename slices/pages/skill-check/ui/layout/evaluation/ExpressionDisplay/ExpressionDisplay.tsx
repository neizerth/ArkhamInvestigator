import * as C from './ExpressionDisplay.components';
import { Fragment } from 'react';
import { iconMapping, operatorMapping } from './mapping';
import type { ExpressionDisplayProps } from './ExpressionDisplay.types';
import { selectSkillCheckHistory, useAppSelector } from '@shared/lib';
import { last } from 'ramda';

export type { ExpressionDisplayProps };

export const ExpressionDisplay = ({
  data,
  value,
  ...props
}: ExpressionDisplayProps) => {
  const history = useAppSelector(selectSkillCheckHistory)
  const { type } = props;

  const lastValue = last(history)?.value;
  return (
    <C.Container {...props}>
      <C.Expression type={type}>
        {data.length === 0 && lastValue}
        {data.map(item => (
          <Fragment key={item.id}>
            {item.type === 'number' && item.value}
            {item.type === 'operator' && operatorMapping[item.operator]}
            {item.type === 'stat' && (
              <C.Stat 
                icon={iconMapping[item.statType] || item.statType}
                type={type}
              />
            )}
          </Fragment>
        ))}
        {value !== undefined && `=${value}`}
      </C.Expression>
    </C.Container>
  );
}