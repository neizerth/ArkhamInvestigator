import { selectSelectedInvestigators, useAppDispatch, useAppSelector } from '@shared/lib';
import * as C from './StartButton.components';
import { getInvestigatorImageUrl } from '@shared/api/getInvestigatorImageUrl';
import type { SelectedInvestigator } from '@shared/model';
import { useCallback } from 'react';
import { startGame } from '../../lib';

const getImageSource = ({
  code
}: SelectedInvestigator) => ({
  uri: getInvestigatorImageUrl(code, 'square')
});

export const StartButton = () => {
  const dispatch = useAppDispatch();
  const investigators = useAppSelector(selectSelectedInvestigators);

  const start = useCallback(() => {
    dispatch(startGame());
  }, [dispatch])

  return (
    <C.Container 
      onPress={start} 
    >
      <C.Content>
        <C.Investigators>
          {investigators.map(item => (
            <C.InvestigatorImage
              key={item.id}
              source={getImageSource(item)}
            />
          ))}
        </C.Investigators>
        <C.Text>Start</C.Text>
        <C.Icon icon="right-arrow"/>
      </C.Content>
    </C.Container>
  );
}