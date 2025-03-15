import type { HealthProps } from '@shared/ui'
import * as C from './Health.components'
import { decreaseCurrentStat, increaseCurrentStat, selectCurrentBoard, useAppDispatch, useAppSelector } from '@shared/lib'
import { useCallback } from 'react'
import type { PickerChangeEvent } from '../../features'
import { setCurrentStat } from '@shared/lib/store/features/board/actions/stats/setCurrentStat'
import { range } from 'ramda'

export const Health = (props: HealthProps) => {
  const dispatch = useAppDispatch()
  const board = useAppSelector(selectCurrentBoard);
  const baseValue = board?.baseValue.health || 0;
  const value = board?.value
  const onChange = useCallback(({ value }: PickerChangeEvent) => {
    dispatch(setCurrentStat('health', value))
  }, [dispatch]);

  const onLongPress = useCallback(() => {
    dispatch(increaseCurrentStat('health', baseValue))
  }, [dispatch, baseValue]);

  const onPress = useCallback(() => {
    dispatch(decreaseCurrentStat('health', 0))
  }, [dispatch]);
  
  return (
    <C.Container {...props}>
      <C.Picker
        value={value?.health}
        data={range(0, baseValue + 1)}
        onValueChanged={onChange}
        onLongPress={onLongPress}
        onPress={onPress}
      />
    </C.Container>
  )
}