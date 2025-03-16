import { ContentPage } from '@widgets/content-page';
import * as C from './SettingsPage.components'
import { useAppTranslation } from '@features/i18n';

export const SettingsPage = () => {
  const { t } = useAppTranslation();


  return (
    <ContentPage 
      title={t`Settings`}
    >
      <C.Content>
        <C.Row>
          <C.Label>{t`Language`}</C.Label>
          <C.LanguageSelect/>
        </C.Row>
      </C.Content>
    </ContentPage>
  );
}