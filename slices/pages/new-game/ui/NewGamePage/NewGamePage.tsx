import { InvestigatorSelect } from "@widgets/investigator/investigator-select";
import { Container } from "./NewGamePage.components";
import { TopBar } from "@widgets/top-bar";
import { impactAsync } from "@features/haptic";
import { router } from "expo-router";

export const NewGamePage = () => {

  const goHome = () => {
    router.push('/');
    impactAsync();
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