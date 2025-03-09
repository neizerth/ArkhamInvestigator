import * as C from './Resources.components';
import type { ViewProps } from 'react-native';
import { selectCurrentBoard, useAppDispatch, useAppSelector } from '@shared/lib';
import { range } from 'ramda';
import { setCurrentStat } from '@shared/lib/store/features/board/actions/setCurrentStat';
import { useCallback } from 'react';
import type { PickerValueChangedEvent } from '../../features';

export type ResourcesProps = ViewProps

export const Resources = ({
  ...props
}: ResourcesProps) => {
  const dispatch = useAppDispatch()
  const { value } = useAppSelector(selectCurrentBoard);
  const onChange = useCallback(({ item }: PickerValueChangedEvent) => {
    if (!item) {
      return;
    }
    const { value } = item;

    dispatch(setCurrentStat('resources', value))
  }, [dispatch]);

  return (
    <C.Container {...props}>
      <C.Picker
        value={value.resources}
        data={range(0, 101)}
        onValueChanged={onChange}
      />
    </C.Container>
  );
}