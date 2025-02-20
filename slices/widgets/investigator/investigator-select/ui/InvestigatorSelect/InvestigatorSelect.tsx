import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { propEq } from 'ramda';
import { Container, Content, Footer, Separator } from './InvestigatorSelect.components';
import { selectAvailableInvestigators } from '../../lib/store';
import { InvestigatorList as List } from '../InvestigatorList';
import { addSelectedInvestigator, includesBy, removeSelectedInvestigator, selectSelectedInvestigators, setCurrentInvestigatorDetails } from '@shared/lib';
import type { InvestigatorDetails } from '@shared/model';
import { useCallback } from 'react';
import { MAX_PLAYERS } from '@shared/config';
import { router } from 'expo-router';

export const InvestigatorSelect = () => {
  const data = useAppSelector(selectAvailableInvestigators);
  const selected = useAppSelector(selectSelectedInvestigators);

  const dispatch = useAppDispatch();

  const onChange = useCallback(
    (item: InvestigatorDetails) => {
      const { investigator, media } = item
      const { code } = investigator;
      const withCode = propEq(code, 'code');
      const hasCode = includesBy(withCode, selected);

      if (hasCode) {
        return dispatch(removeSelectedInvestigator(code))
      }

      if (selected.length === MAX_PLAYERS) {
        return;
      }

      const selectedItem = { code }
      dispatch(addSelectedInvestigator(selectedItem))

      if (media?.skins || media?.variants) {
        dispatch(setCurrentInvestigatorDetails(item));
        router.push('/investigator-details');
        return;
      }


    }, [selected, dispatch]);

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