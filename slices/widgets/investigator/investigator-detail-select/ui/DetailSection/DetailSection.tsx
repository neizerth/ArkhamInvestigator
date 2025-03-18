import type { PropsWithChildren } from 'react';
import { Container, Title, Header, Value } from './DetailSection.components';
import { useAppTranslation } from '@features/i18n';

export type DetailSectionProps = PropsWithChildren & {
  title: string
  value?: string
}

export const DetailSection = ({
  title,
  children,
  ...props
}: DetailSectionProps) => {
  const { t } = useAppTranslation()
  const value = t(props.value || '');
  return (
    <Container {...props}>
      <Header>
        <Title>
          {title}
        </Title>
        <Value>
          {value}
        </Value>
      </Header>
      {children}
    </Container>
  );
}