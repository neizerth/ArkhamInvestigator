import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { ascend, propEq, reject, sortWith } from 'ramda';
import { InvestigatorPreview } from '../../../investigator-preview/ui/InvestigatorListItem/InvestigatorPreview';
import { Container } from './InvestigatorSelect.components';
import { useColumnsCount } from '../../lib/hooks/useColumnsCount';
import { useCallback } from 'react';
import { MAX_PLAYERS } from '@shared/config';
import { selectAvailableInvestigators } from '../../lib/store';
import { addSelectedInvestigator, includesBy, removeSelectedInvestigator, selectSelectedInvestigators, setCurrentInvestigatorDetails } from '@shared/lib';
import type { AvailableInvestigator } from '../../model';
import { router } from 'expo-router';

export type InvestigatorSelectProps = {
  onChange?: (code: string) => void
}

export const InvestigatorSelect = ({
  onChange
}: InvestigatorSelectProps) => {
  const dispatch = useAppDispatch();
  const numColumns = useColumnsCount();
  const selected = useAppSelector(selectSelectedInvestigators);
  const investigators = useAppSelector(selectAvailableInvestigators);

  const data = sortWith(
    [
      ascend(({ investigator }) => investigator.faction_code),
      ascend(({ investigator }) => investigator.code),
    ],
    investigators
  )

  const toggleSelected = useCallback(
    ({ investigator, media }: AvailableInvestigator) => () => {

      const { code } = investigator;
      const withCode = propEq(code, 'code');
      const hasCode = includesBy(withCode, selected);

      if (hasCode) {
        return dispatch(removeSelectedInvestigator(code))
      }

      if (selected.length === MAX_PLAYERS) {
        return;
      }

      const item = { code }

      if (media?.skins || media?.variants) {
        dispatch(setCurrentInvestigatorDetails(item));
        router.push('/investigator-details');
        return;
      }


      dispatch(addSelectedInvestigator(item))
    }, [selected, dispatch]);

  const isSelected = useCallback(
    ({ investigator }: AvailableInvestigator) => includesBy(
      propEq(investigator.code, 'code'), 
      selected
    ), 
    [selected]
  );

  return (
    <Container
      data={data}
      key={numColumns}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <InvestigatorPreview
          onPress={toggleSelected(item)}
          selected={isSelected(item)}
          investigator={item.investigator}
          media={item.media}
          story={item.story}
        />
      )}
      keyExtractor={({ investigator }) => investigator.code}
    />
  );
}