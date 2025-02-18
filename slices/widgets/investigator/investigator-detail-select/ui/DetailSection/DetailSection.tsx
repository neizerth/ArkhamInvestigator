import type { PropsWithChildren } from 'react';
import { Container, Title, Header, Value } from './DetailSection.components';

export type DetailSectionProps = PropsWithChildren & {
  title: string
  value?: string
}

export const DetailSection = ({
  title,
  value,
  children,
  ...props
}: DetailSectionProps) => {
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