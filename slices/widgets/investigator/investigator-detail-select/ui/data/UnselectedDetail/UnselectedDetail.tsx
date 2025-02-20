import { Icon, Container, type ContainerElement } from './UnselectedDetail.components';

export const UnselectedDetail: ContainerElement = (props) => {
  return (
    <Container {...props}>
      <Icon icon="blocked" />
    </Container>
  );
}