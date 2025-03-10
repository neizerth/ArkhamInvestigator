import { View } from 'react-native-reanimated/lib/typescript/Animated';
import * as C from './Sanity.components';
import type { ViewProps } from 'react-native';
import { selectCurrentBoard, useAppDispatch, useAppSelector } from '@shared/lib';
import { useCallback } from 'react';
import { PickerChangeEvent } from '../../features';
import { setCurrentStat } from '@shared/lib/store/features/board/actions/setCurrentStat';
import { range } from 'ramda';

export type SanityProps = ViewProps

export const Sanity = ({
  ...props
}: SanityProps) => {
  const dispatch = useAppDispatch()
  const { value, baseValue } = useAppSelector(selectCurrentBoard);
  const onChange = useCallback(({ value }: PickerChangeEvent) => {

    dispatch(setCurrentStat('sanity', value))
  }, [dispatch]);

  return (
    <C.Container {...props}>
      <C.Picker
        value={value.sanity}
        data={range(0, baseValue.sanity + 1)}
        onValueChanged={onChange}
      />
    </C.Container>
  );
}