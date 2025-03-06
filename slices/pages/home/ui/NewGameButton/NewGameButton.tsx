import { PrimaryButton } from '@shared/ui';
import * as C from './NewGameButton.components';
import { useCallback } from 'react';
import { navigateTo, useAppDispatch } from '@shared/lib';

export const NewGameButton = () => {
  const dispatch = useAppDispatch();
  const startNewGame = useCallback(() => {
    dispatch(navigateTo('/new-game'));
  }, [dispatch]);

  return (
    <PrimaryButton onPress={startNewGame}>
      <C.Text>
        New Game
      </C.Text>
    </PrimaryButton>
  );
}