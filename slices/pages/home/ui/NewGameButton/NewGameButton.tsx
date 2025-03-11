import { PrimaryButton } from '@shared/ui';
import * as C from './NewGameButton.components';
import { useCallback } from 'react';
import { goToPage, replacePageTo, useAppDispatch } from '@shared/lib';
import { startNewGame } from '@pages/home/lib';

export const NewGameButton = () => {
  const dispatch = useAppDispatch();
  const onStart = useCallback(() => {
    dispatch(startNewGame());
  }, [dispatch]);

  return (
    <PrimaryButton onPress={onStart}>
      <C.Text>
        New Game
      </C.Text>
    </PrimaryButton>
  );
}