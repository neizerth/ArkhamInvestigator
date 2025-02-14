import { InvestigatorList } from "@widgets/investigator-list";
import { Container, Title } from "./NewGamePage.components";

export const NewGamePage = () => {
  return (
    <Container>
      <Title>Select Investigator</Title>
      <InvestigatorList/>
    </Container>
  );
}