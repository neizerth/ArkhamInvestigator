import { decreaseCurrentStat, increaseCurrentStat, selectCurrentBoard, setBaseStat, useAppDispatch, useAppSelector } from '@shared/lib';
import * as C from './Actions.components';
import { type ViewProps } from 'react-native';
import { useCallback } from 'react';
import type { PickerChangeEvent } from '../../features';
import { setCurrentStat } from '@shared/lib/store/features/board/actions/stats/setCurrentStat';
import { range } from 'ramda';

export type ActionsProps = ViewProps

export const Actions = ({
  ...props
}: ActionsProps) => {
  const dispatch = useAppDispatch()
  const { value, baseValue } = useAppSelector(selectCurrentBoard);
  const { additionalAction, actions } = value;

  const onChange = useCallback(({ value }: PickerChangeEvent) => {

    dispatch(setCurrentStat('actions', value))
  }, [dispatch]);

  const toggleAdditionalAction = useCallback(() => {
    dispatch(setCurrentStat('additionalAction', !additionalAction))
  }, [dispatch, additionalAction]);

  const onLongPress = useCallback(() => {
    dispatch(setBaseStat('actions', actions))
  }, [dispatch, actions]);

  const onPress = useCallback(() => {
    const value = actions === 0 ? baseValue.actions : actions - 1;
    dispatch(decreaseCurrentStat('actions', value))

  }, [dispatch, actions, baseValue.actions]);

  return (
    <C.Container {...props}>
      <C.Content>
        <C.Picker
          value={value.actions}
          data={range(0, 101)}
          onValueChanged={onChange}
          onPress={onPress}
          onLongPress={onLongPress}
          longPressPattern="notificationSuccess"
        />

        {baseValue.additionalAction && (
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