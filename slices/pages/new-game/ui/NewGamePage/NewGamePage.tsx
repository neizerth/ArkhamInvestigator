import { InvestigatorSelect } from "@widgets/investigator/investigator-select";
import { Container } from "./NewGamePage.components";
import { TopBar } from "@widgets/top-bar";
import { router } from "expo-router";
import { useAppTranslation } from "@features/i18n";

export const NewGamePage = () => {
  const { t } = useAppTranslation();

  const goHome = () => {
    router.push('/');
  }
  return (
    <Container>
      <TopBar
        onBack={goHome}
        title={t`Choose an Investigator`}
      />
      <InvestigatorSelect/>
    </Container>
  );
}