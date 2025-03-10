import type { InvestigatorSkillType } from '@shared/model';
import * as C from './Skill.components';
import type { ViewProps } from 'react-native';
import { navigateTo, selectCurrentBoard, startSkillCheck, useAppDispatch, useAppSelector } from '@shared/lib';
import { useCallback, useContext, useState } from 'react';
import { SkillsContext } from '@pages/board/config';
import { getSkillStyle } from './Skill.styles';
import { impactHapticFeedback } from '@features/haptic';
import { PickerItemInfo } from '@widgets/picker';
import { range } from 'ramda';

export type SkillProps = ViewProps & {
  type: InvestigatorSkillType
}

const SKILL_RANGE = range(-12, 20);

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
    impactHapticFeedback('clockTick');
    dispatch(startSkillCheck(type));
  }, [dispatch, type])

  const renderItem = useCallback((props: PickerItemInfo) => {
    const { item } = props;

    const style = getSkillStyle({
      box,
      isParallel,
      value: item
    });

    return (
      <C.Value
        {...props}
        value={item}
        style={style.value}
      />
    )
  }, [box, isParallel]);

  const itemHeight = box.height * 0.9;

  return (
    <C.Container {...props}>
      <C.Row>
        <C.ValueContainer style={style.valueContainer}>
          <C.Picker 
            renderItem={renderItem}
            itemHeight={itemHeight}
            data={SKILL_RANGE}
            value={skillValue}
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