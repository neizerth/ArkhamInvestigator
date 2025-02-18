import type { ViewProps } from 'react-native';
import { Container, Title, Header, Value } from './DetailSection.components';

export type DetailSectionProps = ViewProps & {
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