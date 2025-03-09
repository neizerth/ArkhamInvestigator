import { selectCurrentBoard, useAppDispatch, useAppSelector } from '@shared/lib';
import * as C from './Actions.components';
import { ViewProps } from 'react-native';
import { useCallback } from 'react';
import { PickerValueChangedEvent } from '../../features';
import { setCurrentStat } from '@shared/lib/store/features/board/actions/setCurrentStat';
import { range } from 'ramda';

export type ActionsProps = ViewProps

export const Actions = ({
  ...props
}: ActionsProps) => {
  const dispatch = useAppDispatch()
  const { value } = useAppSelector(selectCurrentBoard);
  const onChange = useCallback(({ item }: PickerValueChangedEvent) => {
    if (!item) {
      return;
    }
    const { value } = item;

    dispatch(setCurrentStat('actions', value))
  }, [dispatch]);
  const { additionalAction } = value;

  const actionIcon = 'investigator';
  return (
    <C.Container {...props}>
      <C.Content>
        <C.Picker
          value={value.actions}
          data={range(0, 101)}
          onValueChanged={onChange}
        />

        {additionalAction && (
          <C.AdditionalAction>
            <C.ActionIcon icon={actionIcon}/>
          </C.AdditionalAction>
        )}
      </C.Content>
    </C.Container>
  );
}