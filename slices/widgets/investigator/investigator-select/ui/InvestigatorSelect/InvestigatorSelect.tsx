import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { propEq } from 'ramda';
import { Container, Content, Footer, Separator } from './InvestigatorSelect.components';
import { selectAvailableInvestigators } from '../../lib/store';
import { InvestigatorList as List } from '../InvestigatorList';
import { changeSelectedInvestigator, selectSelectedInvestigators } from '@shared/lib';
import type { InvestigatorDetails } from '@shared/model';
import { useCallback } from 'react';

export const InvestigatorSelect = () => {
  const data = useAppSelector(selectAvailableInvestigators);
  const selected = useAppSelector(selectSelectedInvestigators);

  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (item: InvestigatorDetails) => dispatch(changeSelectedInvestigator(item)), 
    [dispatch]
  );

  const official = data.filter(propEq(true, 'is_official'));
  const fanMade = data.filter(propEq(false, 'is_official'));

  return (
    <Container>
      <Content>
        <List 
          data={official} 
          onChange={onChange}
          selected={selected}
        />
        <Separator>— Fan-made Investigators —</Separator>
        <List 
          data={fanMade} 
          onChange={onChange}
          selected={selected}
        />
      </Content>
      <Footer/>
    </Container>
  );
}