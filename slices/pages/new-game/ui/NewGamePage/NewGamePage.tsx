import { InvestigatorSelect } from "@widgets/investigator/investigator-select";
import { BackIcon, Container, BackButton, Header } from "./NewGamePage.components";
import { TopBar } from "@shared/ui";
import { impactAsync } from "@features/haptic";
import { router } from "expo-router";

export const NewGamePage = () => {

  const goHome = () => {
    impactAsync();
    router.push('/');
  }
  return (
    <Container>
      <TopBar>
        <BackButton onPress={goHome}>
          <BackIcon/>
        </BackButton>
        <Header>Select Investigator</Header>
      </TopBar>
      <InvestigatorSelect
      />
    </Container>
  );
}