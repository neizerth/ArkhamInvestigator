import { PrimaryButton, type PrimaryButtonProps } from '@shared/ui';
import * as C from './NewGameButton.components';
import { useAppTranslation } from '@features/i18n';

export const NewGameButton = (props: PrimaryButtonProps) => {
  const { t } = useAppTranslation();
  return (
    <PrimaryButton {...props}>
      <C.Text>
        {t`New Game`}
      </C.Text>
    </PrimaryButton>
  );
}