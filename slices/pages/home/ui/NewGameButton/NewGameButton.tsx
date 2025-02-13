import { router } from 'expo-router';

import { Text, Container, Background } from './NewGameButton.components';
import { impactAsync } from '@features/haptic';
import { useCallback, useState } from 'react';
import { Visible } from '@shared/ui';

export const NewGameButton = () => {
  const [loaded, setLoaded] = useState(false);

  const startNewGame = useCallback(() => {
    impactAsync();
    router.push('/new-game');
  }, []);

  const onLoad = useCallback(() => setLoaded(true), []);

  return (
    <Container onPress={startNewGame}>
      <Background onLoad={onLoad}>
        <Visible show={loaded}>
          <Text>New Game</Text>
        </Visible>
      </Background>
    </Container>
  );
}