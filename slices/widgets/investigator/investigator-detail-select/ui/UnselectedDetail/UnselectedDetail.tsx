import type { ViewProps } from 'react-native';
import { Icon, Container, type ContainerElement } from './UnselectedDetail.components';

export type UnselectedDetailProps = ViewProps & {
  selected: boolean
}

export const UnselectedDetail: ContainerElement = (props: UnselectedDetailProps) => {
  return (
    <Container {...props}>
      <Icon icon="blocked" />
    </Container>
  );
}