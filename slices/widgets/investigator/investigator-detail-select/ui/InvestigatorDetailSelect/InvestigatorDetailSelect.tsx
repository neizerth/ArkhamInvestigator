import { selectCurrentInvestigatorDetails, useAppDispatch, useAppSelector } from "@shared/lib";
import { Container, Content, Card, Sections } from "./InvestigatorDetailSelect.components";
import { TopBar, TopBarButton, TopBarPlaceholder } from "@widgets/top-bar";
import { router } from "expo-router";
import type { Faction } from "@shared/model";
import { useState } from "react";
import { getSkins, getVariants } from "../../lib";
import type { InvestigatorDetailItem } from "../../model";
import { DataSection } from "../DataSection";
import { Outside } from "@shared/ui";
import { InvestigatorDescription } from "../InvestigatorDescription";

type DetailItem = InvestigatorDetailItem | null;
export const InvestigatorDetailSelect = () => {
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectCurrentInvestigatorDetails);

  const [variant, setVariant] = useState<DetailItem>(null);
  const [skin, setSkin] = useState<DetailItem>(null); 

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

  return (
    <Container>
      <Outside onPress={goBack}/>
      <Content>
        <Card 
          faction={faction}
          title={investigator.name}
          subtitle={investigator.subname}
          onClose={goBack}
        >
          <Sections>
            <InvestigatorDescription
              data={details}
              variant={variant}
              skin={skin}
            />
            <DataSection
              title="Variants"
              data={variants}
              onChange={setVariant}
            />
            <DataSection
              title="Skins"
              data={skins}
              onChange={setSkin}
              defaultValue={null}
              showIcon={false}
              showNone
            />
          </Sections>
        </Card>
      </Content>
    </Container>
  );
}