import { useAppSelector } from '@shared/lib/hooks';
import { selectAvailableInvestigators } from '@shared/lib/store';
import { ascend, prop, sortBy, sortWith } from 'ramda';
import { InvestigatorListItem } from '../InvestigatorListItem/InvestigatorListItem';
import { Container } from './InvestigatorList.components';
import { useColumnsCount } from '../../lib/useColumnsCount';
import { useCallback, useState } from 'react';
import { MAX_PLAYERS } from '@shared/config';

export type InvestigatorListProps = {

}

export const InvestigatorList = ({}: InvestigatorListProps) => {
  const numColumns = useColumnsCount();
  const [selected, setSelected] = useState<string[]>([]);

  const investigators = useAppSelector(selectAvailableInvestigators);

  const data = sortWith(
    [
      ascend(({ investigator }) => investigator.faction_code),
      ascend(({ investigator }) => investigator.code),
    ],
    investigators
  )

  const toggleSelected = useCallback(
    (code: string) => () => 
      setSelected(selected => {
        if (selected.includes(code)) {
          return selected.filter(c => c!== code);
        }
        if (selected.length === MAX_PLAYERS) {
          return selected;
        }
        return [...selected, code]
      }), []);

  const isSelected = useCallback((code: string) => selected.includes(code), [selected]);

  return (
    <Container
      data={data}
      key={numColumns}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <InvestigatorListItem
          onPress={toggleSelected(item.investigator.code)}
          selected={isSelected(item.investigator.code)}
          investigator={item.investigator}
          media={item.media}
          story={item.story}
        />
      )}
      keyExtractor={({ investigator }) => investigator.code}
    />
  );
}