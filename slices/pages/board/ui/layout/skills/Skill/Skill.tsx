import type { InvestigatorSkillType } from '@shared/model';
import * as C from './Skill.components';
import type { ViewProps } from 'react-native';
import { navigateTo, selectCurrentBoard, startSkillCheck, useAppDispatch, useAppSelector } from '@shared/lib';
import { useCallback, useContext, useState } from 'react';
import { SkillsContext } from '@pages/board/config';
import { getSkillStyle } from './Skill.styles';
import { tick } from '@features/haptic';

export type SkillProps = ViewProps & {
  type: InvestigatorSkillType
}

export const Skill = ({
  type,
  ...props
}: SkillProps) => {
  const box = useContext(SkillsContext);
  const dispatch = useAppDispatch();
  const { value, isParallel } = useAppSelector(selectCurrentBoard);
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

  const openModal = useCallback(() => {
    tick();
    dispatch(startSkillCheck(type));
  }, [dispatch, type])

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
          onPress={openModal}
        />
      </C.Row>
      {pressing && (
        <C.Background style={style.background}/>
      )}
      
    </C.Container>
  );
}