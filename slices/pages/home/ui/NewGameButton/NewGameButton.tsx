import { router } from 'expo-router';

import { Text, Container, Background } from './NewGameButton.components';
import { useCallback, useState } from 'react';
import { Visible } from '@shared/ui';
import { tick } from '@features/haptic';

export const NewGameButton = () => {
  const [loaded, setLoaded] = useState(false);

  const startNewGame = useCallback(() => {
    tick();
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