import { 
  Background, 
  Body, 
  Container,
  Header 
} from './FactionCard.components';

import type { ContainerElement } from './FactionCard.components';

export const InvestigatorDetailSelectCard: ContainerElement = ({
  faction,
  children
}) => {
  return (
    <Container faction={faction}>
      <Header>
        <Background faction={faction}/>
      </Header>
      <Body>
        {children}
      </Body>
    </Container>
  );
}