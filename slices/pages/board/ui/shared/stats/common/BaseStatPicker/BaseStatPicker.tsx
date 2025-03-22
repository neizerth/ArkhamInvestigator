import { range } from 'ramda';
import * as C from './BaseStatPicker.components';
import { useCallback, useMemo } from 'react';
import { selectCurrentStatValues, setBaseStat, setCurrentStat, useAppDispatch, useAppSelector } from '@shared/lib';
import type { InvestigatorBoardStat } from '@shared/model';
import type { PickerChangeEvent } from '@widgets/picker';
import { ViewStyle } from 'react-native';
import { StatPickerProps } from '../StatPicker';

export type DefinedBaseStatPickerProps = Omit<StatPickerProps, 'data'> & {
  contentContainerStyle?: ViewStyle
}

export type BaseStatPickerProps = DefinedBaseStatPickerProps & {
  statType: InvestigatorBoardStat
}

const pickerData = [
  ...range(-9, 0),
  ...range(1, 10)
]

export const BaseStatPicker = ({
  statType,
  contentContainerStyle,
  ...props
}: BaseStatPickerProps) => {
  const selectValues = useMemo(
    () => selectCurrentStatValues(statType), 
    [statType]
  )

  const {
    initialValue,
    baseValue,
    value
  } = useAppSelector(selectValues);

  const diff = baseValue - initialValue;

  const dispatch = useAppDispatch();

  const setDiff = useCallback((nextDiff: number) => {
    const nextBaseValue = Math.max(
      0,
      initialValue + nextDiff
    )
    
    dispatch(setBaseStat(statType, nextBaseValue));

    const delta = nextBaseValue - baseValue;

    const nextValue = Math.max(
      0,
      Math.min(
        nextBaseValue,
        value + delta
      )
    )
    dispatch(setCurrentStat(statType, nextValue));
  }, [dispatch, statType, initialValue, baseValue, value]);

  const onChange = useCallback(({ value = 0 }: PickerChangeEvent) => {
    setDiff(value)
  }, [setDiff]);

  const onLongPress = useCallback(() => {
    setDiff(0);
  }, [setDiff]);
  
  const onPress = useCallback(() => {
    if (diff > 0) {
      setDiff(diff - 1)
    }
    else {
      setDiff(diff + 1)
    }
  }, [diff, setDiff]);

  return (
    <C.Container style={contentContainerStyle}>
      <C.Picker
        {...props}
        value={diff}
        data={pickerData}
        onValueChanged={onChange}
        onPress={onPress}
        onLongPress={onLongPress}
        animatedInit={false}
        signed
      />
    </C.Container>
  );
}