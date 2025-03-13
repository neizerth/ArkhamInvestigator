import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { propEq } from 'ramda';
import * as C from './InvestigatorSelect.components';
import { selectAvailableInvestigators } from '../../lib/store';
import { InvestigatorList as List } from '../InvestigatorList';
import { changeSelectedInvestigator, selectCurrentBoard } from '@shared/lib';
import type { InvestigatorDetails } from '@shared/model';
import { useCallback } from 'react';
import { useAppTranslation } from '@features/i18n';

export const InvestigatorSelect = () => {
  const data = useAppSelector(selectAvailableInvestigators);
  const { t } = useAppTranslation()
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (item: InvestigatorDetails) => dispatch(changeSelectedInvestigator(item)), 
    [dispatch]
  );

  const official = data.filter(propEq(true, 'isOfficial'));
  const fanMade = data.filter(propEq(false, 'isOfficial'));

  const title = t`Fan-made Investigators`;

  return (
    <C.Container>
      <C.Content>
        <List 
          data={official} 
          onChange={onChange}
        />
        <C.Separator>— {title} —</C.Separator>
        <List 
          data={fanMade} 
          onChange={onChange}
        />
      </C.Content>
      <C.Footer/>
    </C.Container>
  );
}