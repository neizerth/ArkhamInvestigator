import type { HealthProps } from '@shared/ui'
import * as C from './Health.components'
import { decreaseCurrentStat, increaseCurrentStat, selectCurrentBoard, useAppDispatch, useAppSelector } from '@shared/lib'
import { useCallback } from 'react'
import { PickerChangeEvent } from '../../features'
import { setCurrentStat } from '@shared/lib/store/features/board/actions/setCurrentStat'
import { range } from 'ramda'

export const Health = (props: HealthProps) => {
  const dispatch = useAppDispatch()
  const { value, baseValue } = useAppSelector(selectCurrentBoard);
  const onChange = useCallback(({ value }: PickerChangeEvent) => {

    dispatch(setCurrentStat('health', value))
  }, [dispatch]);

  const onLongPress = useCallback(() => {
    dispatch(increaseCurrentStat('health', baseValue.health))
  }, [dispatch, baseValue.health]);

  const onPress = useCallback(() => {
    dispatch(decreaseCurrentStat('health', 0))
  }, [dispatch]);
  
  return (
    <C.Container {...props}>
      <C.Picker
        value={value.health}
        data={range(0, baseValue.health + 1)}
        onValueChanged={onChange}
        onLongPress={onLongPress}
        onPress={onPress}
      />
    </C.Container>
  )
}