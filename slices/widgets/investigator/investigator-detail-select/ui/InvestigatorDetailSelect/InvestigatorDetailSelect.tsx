import { selectCurrentInvestigatorDetails, useAppDispatch, useAppSelector } from "@shared/lib";
import { View } from "react-native";
import { Container } from "./InvestigatorDetailSelect.components";
import { TopBar, TopBarButton } from "@widgets/top-bar";
import { router } from "expo-router";

export const InvestigatorDetailSelect = () => {
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectCurrentInvestigatorDetails);

  const goBack = () => {
    router.push('/new-game');
  }

  return (
    <Container>
      <TopBar>
        <TopBarButton 
          icon="close"
          onPress={goBack}
        />
      </TopBar>
    </Container>
  );
}