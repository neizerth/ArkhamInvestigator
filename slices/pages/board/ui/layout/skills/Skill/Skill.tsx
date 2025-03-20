import type { InvestigatorSkillType } from '@shared/model';
import * as C from './Skill.components';
import type { ViewProps } from 'react-native';
import { goToPage, selectCurrentBoard, setCurrentStat, startSkillCheck, useAppDispatch, useAppSelector } from '@shared/lib';
import { useCallback, useContext, useState } from 'react';
import { SkillsContext } from '@pages/board/config';
import { getSkillStyle, getSkillValueStyle } from './Skill.styles';
import { impactHapticFeedback } from '@features/haptic';
import type { PickerChangeEvent, PickerItemInfo } from '@widgets/picker';
import { range } from 'ramda';

export type SkillProps = ViewProps & {
  type: InvestigatorSkillType
}

const SKILL_RANGE = range(0, 21);

export const Skill = ({
  type,
  ...props
}: SkillProps) => {
  const box = useContext(SkillsContext);
  const dispatch = useAppDispatch();
  const { value, baseValue, isParallel } = useAppSelector(selectCurrentBoard);
  const [pressing, setPressing] = useState(false);
  const skillValue = value[type];
  const baseSkillValue = baseValue[type];

  const style = getSkillStyle({box});

  const onPressIn = useCallback(() => {
    setPressing(true)
  }, [])

  const onPressOut = useCallback(() => {
    impactHapticFeedback('clockTick');
    setPressing(false)
  }, [])

  const openModal = useCallback(() => {
    dispatch(startSkillCheck(type));
  }, [dispatch, type])

  const onChange = useCallback(({ value }: PickerChangeEvent) => {
    dispatch(setCurrentStat(type, value))
  }, [dispatch, type])

  const renderItem = useCallback((props: PickerItemInfo) => {
    const { item } = props;

    const style = getSkillValueStyle({
      box,
      isParallel,
      value: item,
      baseValue: baseSkillValue
    });

    return (
      <C.Value
        {...props}
        value={item}
        style={style}
      />
    )
  }, [box, baseSkillValue, isParallel]);

  const itemHeight = box.height * 0.8;

  return (
    <C.Container {...props}>
      <C.Row>
        <C.ValueContainer style={style.valueContainer}>
          <C.Picker 
            renderItem={renderItem}
            itemHeight={itemHeight}
            data={SKILL_RANGE}
            value={skillValue}
            onValueChanged={onChange}
            onPress={openModal}
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