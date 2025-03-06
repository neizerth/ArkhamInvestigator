import { characters } from '@pages/skill-check/config';
import * as C from './ExpressionDisplay.components';
import { ViewProps } from 'react-native';
import { selectSkillCheckData, useAppSelector } from '@shared/lib';
import { Fragment } from 'react';
import { operatorMapping } from './mapping';
import { iconMapping } from '@widgets/game-text';

export type ExpressionDisplayProps = ViewProps
export const ExpressionDisplay = ({
  ...props
}: ExpressionDisplayProps) => {
  const data = useAppSelector(selectSkillCheckData);
  return (
    <C.Container {...props}>
      <C.Expression>
        {data.map(item => (
          <Fragment key={item.id}>
            {item.type === 'number' && item.value}
            {item.type === 'operator' && operatorMapping[item.operator]}
            {item.type === 'stat' && (
              <C.Stat icon={iconMapping[item.statType] || item.statType}/>
            )}
          </Fragment>
        ))}
      </C.Expression>
    </C.Container>
  );
}