import type { ClueProps } from '@shared/ui'
import * as C from './Clues.components'
import { decreaseCurrentStat, increaseCurrentStat, selectCurrentBoard, useAppDispatch, useAppSelector } from '@shared/lib'
import { range } from 'ramda';
import { useCallback } from 'react';
import { setCurrentStat } from '@shared/lib';
import type { PickerChangeEvent } from '@widgets/picker';

export const Clues = (props: ClueProps) => {
  const dispatch = useAppDispatch()
  const { value } = useAppSelector(selectCurrentBoard);
  const onChange = useCallback(({ value }: PickerChangeEvent) => {
    dispatch(setCurrentStat('clues', value))
  }, [dispatch]);

  const onLongPress = useCallback(() => {
    dispatch(increaseCurrentStat('clues'))
  }, [dispatch]);

  const onPress = useCallback(() => {
    dispatch(decreaseCurrentStat('clues'))
  }, [dispatch]);

  return (
    <C.Container {...props}>
      <C.Picker
        value={value.clues}
        data={range(0, 101)}
        onValueChanged={onChange}
        onLongPress={onLongPress}
        onPress={onPress}
      />
    </C.Container>
  )
}