import { selectCurrentInvestigatorDetails, useAppDispatch, useAppSelector } from "@shared/lib";
import { Pressable, StyleSheet } from "react-native";
import { Container, Content, Card } from "./InvestigatorDetailSelect.components";
import { TopBar, TopBarButton, TopBarPlaceholder } from "@widgets/top-bar";
import { router } from "expo-router";
import { getInvestigatorImageUrl as getImageUrl } from "@shared/api/getInvestigatorImageUrl";
import type { Faction } from "@shared/model";
import { useState } from "react";
import { VariantSelect } from "../VariantSelect";

export const InvestigatorDetailSelect = () => {
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectCurrentInvestigatorDetails);

  const [variant, setVariant] = useState<string | null>(null);
  const [skin, setSkin] = useState<string | null>(null); 

  if (!details || !details.media) {
    return null;
  }

  const { investigator, media } = details
  const { variants, skins } = media;
  const { code } = investigator;
  const faction = investigator.faction_code as Faction;

  const goBack = () => {
    router.back();
  }

  const image = getImageUrl(code, 'mini');

  return (
    <Container>
      <Pressable onPress={goBack} style={StyleSheet.absoluteFill}/>
      <Content>
        <TopBar>
          <TopBarPlaceholder/>
          <TopBarButton 
            icon="close"
            onPress={goBack}
          />
        </TopBar>
        <Card 
          faction={faction}
          title={investigator.name}
          subtitle={investigator.subname}
        >
          {variants && (
            <VariantSelect
              data={variants}
              selected={variant}
              onChange={setVariant}
            />
          )}
        </Card>
      </Content>
    </Container>
  );
}