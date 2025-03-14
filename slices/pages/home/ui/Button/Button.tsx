import { PrimaryButton, type PrimaryButtonProps } from '@shared/ui';
import * as C from './Button.components';
import { useAppTranslation } from '@features/i18n';

export const Button = ({
  children,
  ...props
}: PrimaryButtonProps) => {
  const { size } = props;
  return (
    <PrimaryButton {...props}>
      <C.Text size={size}>
        {children}
      </C.Text>
    </PrimaryButton>
  );
}