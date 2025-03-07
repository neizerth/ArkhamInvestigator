import * as C from './ExpressionDisplay.components';
import { Fragment } from 'react';
import { iconMapping, operatorMapping } from './mapping';
import type { ExpressionDisplayProps } from './ExpressionDisplay.types';

export type { ExpressionDisplayProps };

export const ExpressionDisplay = ({
  data,
  ...props
}: ExpressionDisplayProps) => {
  const { type } = props;
  console.log({ data })
  return (
    <C.Container {...props}>
      <C.Expression type={type}>
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
      </C.Expression>
    </C.Container>
  );
}