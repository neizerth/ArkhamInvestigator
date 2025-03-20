import { View } from 'react-native-reanimated/lib/typescript/Animated';
import * as C from './Sanity.components';
import type { ViewProps } from 'react-native';
import { decreaseBaseStat, decreaseCurrentStat, increaseBaseStat, increaseCurrentStat, selectCurrentBoard, signedNumber, useAppDispatch, useAppSelector } from '@shared/lib';
import { useCallback } from 'react';
import type { PickerChangeEvent } from '../../features';
import { setCurrentStat } from '@shared/lib/store/features/board/actions/stats/current/setCurrentStat';
import { range } from 'ramda';

export type SanityProps = ViewProps

const MAX_SANITY_VALUE = 20;

export const Sanity = ({
  ...props
}: SanityProps) => {
  const dispatch = useAppDispatch()
  const board = useAppSelector(selectCurrentBoard);
  const value = board?.value
  const initialValue = board?.initialValue.sanity || 0;
  const baseValue = board?.baseValue.sanity || 0;

  const maxValue = baseValue + 10; 

  const onChange = useCallback(({ value }: PickerChangeEvent) => {
    dispatch(setCurrentStat('sanity', value))
  }, [dispatch]);

  const onLongPress = useCallback(() => {
    dispatch(increaseCurrentStat('sanity', maxValue))
    dispatch(increaseBaseStat('sanity'))
  }, [dispatch, maxValue]);

  const onPress = useCallback(() => {
    dispatch(decreaseCurrentStat('sanity'))
    dispatch(decreaseBaseStat('sanity'))
  }, [dispatch]);

  const onDiffPress = useCallback(() => {
    dispatch(decreaseBaseStat('sanity'))
  }, [dispatch]);

  return (
    <C.Container {...props}>
      {baseValue !== initialValue && (
        <C.InitialDiff
          onPress={onDiffPress}
        >
          <C.DiffValue
            value={signedNumber(baseValue - initialValue)}
          />
        </C.InitialDiff>
      )}
      <C.Picker
        value={value?.sanity}
        data={range(0, maxValue + 1)}
        onValueChanged={onChange}
        onLongPress={onLongPress}
        onPress={onPress}
      />
    </C.Container>
  );
}