import * as C from './AboutPage.components';
import { useAppTranslation } from '@features/i18n';
import { ContentPage } from '@shared/ui';

export type AboutPageProps = {

}

export const AboutPage = ({}: AboutPageProps) => {
  const { t } = useAppTranslation();

  return (
    <ContentPage title={t`About`}>
      <C.Text>
        Thank you!
      </C.Text>
    </ContentPage>
  );
}