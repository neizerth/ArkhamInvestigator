import { selectCurrentInvestigatorDetails, useAppDispatch, useAppSelector } from "@shared/lib";
import { Pressable, StyleSheet } from "react-native";
import { Container, Content, Card, Sections } from "./InvestigatorDetailSelect.components";
import { TopBar, TopBarButton, TopBarPlaceholder } from "@widgets/top-bar";
import { router } from "expo-router";
import { getInvestigatorImageUrl as getImageUrl } from "@shared/api/getInvestigatorImageUrl";
import type { Faction } from "@shared/model";
import { useState } from "react";
import { getSkins, getVariants } from "../../lib";
import { DetailSelect } from "../DetailSelect";
import { DetailSection as Section } from "../DetailSection";
import type { InvestigatorDetailItem } from "../../model";

export const InvestigatorDetailSelect = () => {
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectCurrentInvestigatorDetails);

  const [variant, setVariant] = useState<InvestigatorDetailItem | null>(null);
  const [skin, setSkin] = useState<InvestigatorDetailItem | null>(null); 

  if (!details || !details.media) {
    return null;
  }

  const { investigator } = details
  const variants = getVariants(details);
  const skins = getSkins(details);
  const faction = investigator.faction_code as Faction;

  const goBack = () => {
    router.back();
  }

  const variantsTitle = `Variants (${variants.length})`;
  const skinsTitle = `Skins (${skins.length})`;

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
          <Sections>
            {variants.length > 1 && (
              <Section
                title={variantsTitle}
                value={variant?.name}
              >
                <DetailSelect
                  data={variants}
                  selected={variant}
                  onChange={setVariant}
                />
              </Section>
            )}
            {skins.length > 1 && (
              <Section
                title={skinsTitle}
                value={skin?.name}
              >
                <DetailSelect
                  data={skins}
                  selected={skin}
                  onChange={setSkin}
                  showIcon={false}
                />
              </Section>
            )}
          </Sections>
        </Card>
      </Content>
    </Container>
  );
}