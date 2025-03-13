import { InvestigatorSelect } from "@widgets/investigator/investigator-select";
import { Container } from "./NewGamePage.components";
import { TopBar } from "@widgets/top-bar";
import { router } from "expo-router";
import { useAppTranslation } from "@features/i18n";
import { goBack, useAppDispatch } from "@shared/lib";
import { useCallback } from "react";

export const NewGamePage = () => {
  const { t } = useAppTranslation();
  const dispatch = useAppDispatch();

  const back = useCallback(() => {
    dispatch(goBack())
  }, [dispatch])
  return (
    <Container>
      <TopBar
        onBack={back}
        title={t`Choose an Investigator`}
      />
      <InvestigatorSelect/>
    </Container>
  );
}