import { ContentPage } from '@shared/ui';
import * as C from './NewsPage.components';
import { useAppTranslation } from '@features/i18n';

export type NewsPageProps = {

}

export const NewsPage = ({}: NewsPageProps) => {
  const { t } = useAppTranslation();

  return (
    <ContentPage 
      title={t`Recent updates`}
    >
      
    </ContentPage>
  );
}