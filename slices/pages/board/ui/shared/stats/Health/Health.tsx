import type { HealthProps } from '@shared/ui'
import * as C from './Health.components'
import { selectCurrentBoard, useAppDispatch, useAppSelector } from '@shared/lib'
import { useCallback } from 'react'
import { PickerValueChangedEvent } from '../../features'
import { setCurrentStat } from '@shared/lib/store/features/board/actions/setCurrentStat'
import { range } from 'ramda'

export const Health = (props: HealthProps) => {
  const dispatch = useAppDispatch()
  const { value, baseValue } = useAppSelector(selectCurrentBoard);
  const onChange = useCallback(({ item }: PickerValueChangedEvent) => {
    if (!item) {
      return;
    }
    const { value } = item;

    dispatch(setCurrentStat('health', value))
  }, [dispatch]);
  
  return (
    <C.Container {...props}>
      <C.Picker
        value={value.health}
        data={range(0, baseValue.health + 1)}
        onValueChanged={onChange}
      />
    </C.Container>
  )
}