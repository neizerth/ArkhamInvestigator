import { PrimaryButton } from '@shared/ui';
import * as C from './NewGameButton.components';
import { useCallback } from 'react';
import { goToPage, replacePageTo, useAppDispatch } from '@shared/lib';
import { startNewGame } from '@pages/home/lib';
import { useAppTranslation } from '@features/i18n';

export const NewGameButton = () => {
  const dispatch = useAppDispatch();
  const { t } = useAppTranslation();
  const onStart = useCallback(() => {
    dispatch(startNewGame());
  }, [dispatch]);

  return (
    <PrimaryButton onPress={onStart}>
      <C.Text>
        {t`New Game`}
      </C.Text>
    </PrimaryButton>
  );
}