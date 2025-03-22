import { range } from 'ramda';
import * as C from './BaseStatPicker.components';
import { useCallback } from 'react';
import { decreaseBaseStat, increaseBaseStat, selectCurrentBoard, setBaseStat, setCurrentStat, useAppDispatch, useAppSelector } from '@shared/lib';
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
  const currentBoard = useAppSelector(selectCurrentBoard);
  const initialValue = currentBoard.initialValue[statType];
  const baseValue = currentBoard.baseValue[statType];
  const value = currentBoard.value[statType]

  const diff = baseValue - initialValue;

  const dispatch = useAppDispatch();

  const onPress = useCallback(() => {
    if (diff > 0) {
      setDiff(diff - 1)
    }
    else {
      setDiff(diff + 1)
    }
  }, [diff]);

  const onLongPress = useCallback(() => {
    setDiff(0)
  }, []);

  const onChange = useCallback(({ value = 0 }: PickerChangeEvent) => {
    setDiff(value)
  }, []);

  const setDiff = useCallback((nextDiff: number) => {
    const nextBaseValue = initialValue + nextDiff;
    dispatch(setBaseStat(statType, nextBaseValue));
    const nextValue = Math.min(
      nextBaseValue,
      value
    )
    dispatch(setCurrentStat(statType, nextValue));
  }, [dispatch, statType, initialValue, value]);
  
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