import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { propEq } from 'ramda';
import * as C from './InvestigatorSelect.components';
import { selectAvailableInvestigators } from '../../lib/store';
import { InvestigatorList as List } from '../InvestigatorList';
import { changeSelectedInvestigator, selectCurrentBoard } from '@shared/lib';
import type { InvestigatorDetails } from '@shared/model';
import { useCallback } from 'react';

export const InvestigatorSelect = () => {
  const data = useAppSelector(selectAvailableInvestigators);
  const board = useAppSelector(selectCurrentBoard);
  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (item: InvestigatorDetails) => dispatch(changeSelectedInvestigator(item)), 
    [dispatch]
  );

  const official = data.filter(propEq(true, 'isOfficial'));
  const fanMade = data.filter(propEq(false, 'isOfficial'));

  return (
    <C.Container>
      <C.Content>
        <List 
          data={official} 
          onChange={onChange}
        />
        <C.Separator>— Fan-made Investigators —</C.Separator>
        <List 
          data={fanMade} 
          onChange={onChange}
        />
      </C.Content>
      <C.Footer/>
    </C.Container>
  );
}