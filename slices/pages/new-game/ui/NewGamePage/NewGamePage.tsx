import { InvestigatorSelect } from "@widgets/investigator/investigator-select";
import { Container } from "./NewGamePage.components";
import { TopBar } from "@widgets/top-bar";
import { router } from "expo-router";

export const NewGamePage = () => {

  const goHome = () => {
    router.push('/');
  }
  return (
    <Container>
      <TopBar
        onBack={goHome}
        title="Select Investigator"
      />
      <InvestigatorSelect/>
    </Container>
  );
}