import * as C from './Resources.components';
import type { ViewProps } from 'react-native';
import { decreaseCurrentStat, increaseCurrentStat, selectCurrentBoard, useAppDispatch, useAppSelector } from '@shared/lib';
import { range } from 'ramda';
import { setCurrentStat } from '@shared/lib/store/features/board/actions/stats/setCurrentStat';
import { useCallback } from 'react';
import type { PickerChangeEvent } from '../../features';

export type ResourcesProps = ViewProps

export const Resources = ({
  ...props
}: ResourcesProps) => {
  const dispatch = useAppDispatch()
  const board = useAppSelector(selectCurrentBoard);
  const value = board?.value
  const onChange = useCallback(({ value }: PickerChangeEvent) => {
    dispatch(setCurrentStat('resources', value))
  }, [dispatch]);

  const onLongPress = useCallback(() => {
    dispatch(increaseCurrentStat('resources'))
  }, [dispatch]);

  const onPress = useCallback(() => {
    dispatch(decreaseCurrentStat('resources', 0))
  }, [dispatch]);

  return (
    <C.Container {...props}>
      <C.Picker
        value={value?.resources}
        data={range(0, 101)}
        onValueChanged={onChange}
        onLongPress={onLongPress}
        onPress={onPress}
      />
    </C.Container>
  );
}