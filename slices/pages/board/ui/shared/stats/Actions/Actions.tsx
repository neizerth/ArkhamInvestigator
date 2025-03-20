import { decreaseBaseStat, decreaseCurrentStat, increaseBaseStat, increaseCurrentStat, selectCurrentBoard, setBaseStat, signedNumber, useAppDispatch, useAppSelector } from '@shared/lib';
import * as C from './Actions.components';
import type { ViewProps } from 'react-native';
import { useCallback } from 'react';
import type { PickerChangeEvent } from '../../features';
import { setCurrentStat } from '@shared/lib/store/features/board/actions/stats/current/setCurrentStat';
import { range } from 'ramda';

export type ActionsProps = ViewProps

export const Actions = ({
  ...props
}: ActionsProps) => {
  const dispatch = useAppDispatch()
  const board = useAppSelector(selectCurrentBoard);
  const { additionalAction, actions } = board.value;
  const baseValue = board.baseValue.actions;
  const initialValue = board.initialValue.actions;
  const value = board.value.actions

  const onChange = useCallback(({ value }: PickerChangeEvent) => {

    dispatch(setCurrentStat('actions', value))
  }, [dispatch]);

  const toggleAdditionalAction = useCallback(() => {
    dispatch(setCurrentStat('additionalAction', !additionalAction))
  }, [dispatch, additionalAction]);

  const onLongPress = useCallback(() => {
    dispatch(increaseBaseStat('actions'));
    dispatch(increaseCurrentStat('actions'));
  }, [dispatch]);

  const onPress = useCallback(() => {
    const actions = value === 0 ? baseValue : value - 1;
    dispatch(setCurrentStat('actions', actions))
  }, [dispatch, value, baseValue]);

  const onDiffPress = useCallback(() => {
    dispatch(decreaseBaseStat('actions'))
    dispatch(decreaseCurrentStat('actions'))
  }, [dispatch]);

  return (
    <C.Container {...props}>
      <C.Content>
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
          data={range(0, 101)}
          onValueChanged={onChange}
          onPress={onPress}
          onLongPress={onLongPress}
        />

        {board.baseValue.additionalAction && (
          <C.AdditionalAction onPress={toggleAdditionalAction} pressHapticPattern="effectTick">
            <C.ActionIcon icon="investigator"/>
            {!additionalAction && (
              <C.UsedAction icon="cross_c"/>
            )}
          </C.AdditionalAction>
        )}
      </C.Content>
    </C.Container>
  );
}