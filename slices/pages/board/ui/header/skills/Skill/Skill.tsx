import { InvestigatorSkillType } from '@shared/model';
import * as C from './Skill.components';
import { ViewProps } from 'react-native';
import { useAppSelector } from '@shared/lib';
import { selectBoard } from '@pages/board/lib';
import { useCallback, useContext, useState } from 'react';
import { SkillsContext } from '@pages/board/config';
import { getSkillStyle } from './Skill.styles';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export type SkillProps = ViewProps & {
  type: InvestigatorSkillType
}

export const Skill = ({
  type,
  ...props
}: SkillProps) => {
  const box = useContext(SkillsContext);
  const { value, isParallel } = useAppSelector(selectBoard);
  const [pressing, setPressing] = useState(false);
  const skillValue = value[type];

  const style = getSkillStyle({
    box,
    isParallel,
    value: skillValue
  });

  const onPressIn = useCallback(() => {
    setPressing(true)
  }, [])

  const onPressOut = useCallback(() => {
    setPressing(false)
  }, [])

  return (
    <C.Container {...props}>
      <C.Row>
        <C.ValueContainer style={style.valueContainer}>
          <C.Value 
            value={skillValue}
            style={style.value}
          />
        </C.ValueContainer>
        <C.Check 
          style={style.check}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        />
      </C.Row>
      {pressing && (
        <C.Background style={style.background}/>
      )}
      
    </C.Container>
  );
}