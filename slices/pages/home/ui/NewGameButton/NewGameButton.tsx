import { router } from 'expo-router';

import { Text, Container, Background } from './NewGameButton.components';
import { useCallback, useState } from 'react';
import { Visible } from '@shared/ui';
import { TICK_PATTERN } from '@features/haptic';

export const NewGameButton = () => {
  const [loaded, setLoaded] = useState(false);

  const startNewGame = useCallback(() => {
    router.push('/new-game');
  }, []);

  const onLoad = useCallback(() => setLoaded(true), []);

  return (
    <Container 
      onPress={startNewGame}
      pressHapticPattern={TICK_PATTERN}
    >
      <Background onLoad={onLoad}>
        <Visible show={loaded}>
          <Text>New Game</Text>
        </Visible>
      </Background>
    </Container>
  );
}