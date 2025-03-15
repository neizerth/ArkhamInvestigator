import { selectCurrentBoard, selectCurrentInvestigatorIndex, selectInvestigatorBoards, setCurrentInvestigatorIndex, useAppDispatch, useAppSelector } from '@shared/lib';
import * as C from './InvestigatorSelect.components';
import { getInvestigatorImageUrl } from '@shared/api';
import { Faction } from '@shared/model';
import type { PickerChangeEvent, PickerItemInfo } from '@widgets/picker';
import { useCallback, useMemo } from 'react';
import type { ViewProps } from 'react-native';
import { prop } from 'ramda';

export type InvestigatorSelectProps = ViewProps

export const InvestigatorSelect = ({
  ...props
}: InvestigatorSelectProps) => {
  const index = useAppSelector(selectCurrentInvestigatorIndex);
  const boards = useAppSelector(selectInvestigatorBoards);
  const dispatch = useAppDispatch();

  const currentIndex = index || 0;
  const nextIndex = (currentIndex + 1) % boards.length;

  const renderItem = useCallback((props: PickerItemInfo) => {
    const { item } = props;

    return (
      <C.Value boardId={item}/>
    )
  }, []);

  const onChange = useCallback(({ value }: PickerChangeEvent) => {
    if (!value) {
      return;
    }
    const index = value - 1;
    dispatch(setCurrentInvestigatorIndex(index));
  }, [dispatch]);

  const next = useCallback(() => {
    dispatch(setCurrentInvestigatorIndex(nextIndex));
  }, [dispatch, nextIndex]);

  const data = useMemo(
    () => boards.map(prop('id')), 
    [boards]
  )

  const value = data[currentIndex];

  return (
    <C.Container {...props}>
      <C.Picker 
        data={data}
        value={value}
        renderItem={renderItem}
        onValueChanged={onChange}
        onPress={next}
      />
    </C.Container>
  );
}