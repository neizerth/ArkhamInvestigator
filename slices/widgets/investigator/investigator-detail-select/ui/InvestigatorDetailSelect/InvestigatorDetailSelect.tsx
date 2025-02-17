import { selectCurrentInvestigatorDetails, useAppDispatch, useAppSelector } from "@shared/lib";
import { View } from "react-native";
import { Container, Content } from "./InvestigatorDetailSelect.components";
import { TopBar, TopBarButton, TopBarPlaceholder } from "@widgets/top-bar";
import { router } from "expo-router";
import { getInvestigatorImageUrl as getImageUrl } from "@shared/api/getInvestigatorImageUrl";
import { InvestigatorDetailSelectCard as Card } from "../FactionCard";
import type { Faction } from "@shared/model";

export const InvestigatorDetailSelect = () => {
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectCurrentInvestigatorDetails);

  if (!details) {
    return null;
  }

  const { investigator } = details
  const { code } = investigator;
  const faction = investigator.faction_code as Faction;

  const goBack = () => {
    router.back();
  }

  const image = getImageUrl(code, 'mini');
  // const { faction } = details 

  return (
    <Container>
      <Content>
        <TopBar>
          <TopBarPlaceholder/>
          <TopBarButton 
            icon="close"
            onPress={goBack}
          />
        </TopBar>
        <Card faction={faction}>

        </Card>
      </Content>
    </Container>
  );
}