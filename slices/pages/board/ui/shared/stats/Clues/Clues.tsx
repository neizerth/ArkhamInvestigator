import type { ClueProps } from '@shared/ui'
import * as C from './Clues.components'
import { selectCurrentBoard, useAppDispatch, useAppSelector } from '@shared/lib'
import { range } from 'ramda';
import { useCallback } from 'react';
import { setCurrentStat } from '@shared/lib/store/features/board/actions/setCurrentStat';
import { PickerValueChangedEvent } from '../../features';

export const Clues = (props: ClueProps) => {
  const dispatch = useAppDispatch()
  const { value } = useAppSelector(selectCurrentBoard);
  const onChange = useCallback(({ item }: PickerValueChangedEvent) => {
    if (!item) {
      return;
    }
    const { value } = item;

    dispatch(setCurrentStat('clues', value))
  }, [dispatch]);

  return (
    <C.Container {...props}>
      <C.Picker
        value={value.clues}
        data={range(0, 101)}
        onValueChanged={onChange}
      />
    </C.Container>
  )
}