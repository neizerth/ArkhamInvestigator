import { useAppTranslation } from '@features/i18n';
import * as C from './SupportPage.components';
import { ContentPage, type ContentPageProps } from '@widgets/content-page';
import { Paragraph, Text, Title } from '@shared/ui';
import { contactLinks, donateLinks } from './links';

export type SupportPageProps = ContentPageProps
export const SupportPage = (props: SupportPageProps) => {
  const { t } = useAppTranslation();

  return (
    <ContentPage
      {...props}
      title={t`Support`}
    >
      <Title>{t`Contact us`}</Title>
      <C.List>
        {contactLinks.map(item => (
          <C.Button 
            key={item.id}
            {...item}
          />
        ))}
      </C.List>
      <C.Cthulhu/>
      <C.List>
        {donateLinks.map(item => (
          <C.Button 
            key={item.id}
            {...item}
          />
        ))}
      </C.List>
    </ContentPage>
  );
}