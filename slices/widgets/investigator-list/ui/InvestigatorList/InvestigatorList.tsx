import { useAppSelector } from '@shared/lib/hooks';
import { selectAvailableInvestigators } from '@shared/lib/store';
import { prop } from 'ramda';
import { InvestigatorListItem } from '../InvestigatorListItem/InvestigatorListItem';
import { Container } from './InvestigatorList.components';
import { useColumnsCount } from '../../lib/useColumnsCount';

export type InvestigatorListProps = {

}

export const InvestigatorList = ({}: InvestigatorListProps) => {
  const numColumns = useColumnsCount();

  const investigators = useAppSelector(selectAvailableInvestigators);

  return (
    <Container
      data={investigators}
      key={numColumns}
      numColumns={numColumns}
      renderItem={({ item: { story, media, ...investigator }}) => (
        <InvestigatorListItem 
          media={media}
          story={story} 
          investigator={investigator}
        />
      )}
      keyExtractor={prop('code')}
    />
  );
}