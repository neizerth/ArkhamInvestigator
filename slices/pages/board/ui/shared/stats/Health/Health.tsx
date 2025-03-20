import type { HealthProps } from '@shared/ui'
import * as C from './Health.components'
import { decreaseBaseStat, decreaseCurrentStat, increaseBaseStat, increaseCurrentStat, selectCurrentBoard, signedNumber, useAppDispatch, useAppSelector } from '@shared/lib'
import { useCallback } from 'react'
import { setCurrentStat } from '@shared/lib/store/features/board/actions/stats/current/setCurrentStat'
import { range } from 'ramda'
import { PickerChangeEvent } from '@widgets/picker'

export const Health = (props: HealthProps) => {
  const dispatch = useAppDispatch()
  const board = useAppSelector(selectCurrentBoard);
  const initialValue = board.initialValue.health || 0;
  const baseValue = board.baseValue.health || 0;
  const value = board.value.health

  const maxValue = baseValue + 10; 
  const onChange = useCallback(({ value }: PickerChangeEvent) => {
    dispatch(setCurrentStat('health', value))
  }, [dispatch]);

  const onLongPress = useCallback(() => {
    dispatch(increaseCurrentStat('health', maxValue))
    dispatch(increaseBaseStat('health'));
  }, [dispatch, maxValue]);

  const onPress = useCallback(() => {
    dispatch(decreaseCurrentStat('health'))
    dispatch(decreaseBaseStat('health'));
  }, [dispatch]);
  
  const onDiffPress = useCallback(() => {
    dispatch(decreaseBaseStat('health'))
    dispatch(decreaseCurrentStat('health'))
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
        value={value}
        data={range(0, maxValue + 1)}
        onValueChanged={onChange}
        onLongPress={onLongPress}
        onPress={onPress}
      />
    </C.Container>
  )
}