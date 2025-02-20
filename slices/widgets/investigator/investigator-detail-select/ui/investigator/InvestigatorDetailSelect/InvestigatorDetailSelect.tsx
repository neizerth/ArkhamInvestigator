import { selectCurrentInvestigatorDetails, useAppDispatch, useAppSelector } from "@shared/lib";
import { Container, Content, Card, Sections } from "./InvestigatorDetailSelect.components";
import { router } from "expo-router";
import type { Faction } from "@shared/model";
import { useCallback, useState } from "react";
import { getSkins, getVariants } from "../../../lib";
import type { InvestigatorDetailItem } from "../../../model";
import { Outside } from "@shared/ui";
import { InvestigatorDescription } from "../InvestigatorDescription";
import { DataSection } from "../../data";
import { setInvestigatorSkin, setInvestigatorVariant } from "@shared/lib/store";

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

  const goBack = useCallback(() => {
    router.back();
  }, [])

  const changeSkin = useCallback((item: DetailItem) => {
    dispatch(setInvestigatorSkin({
      code: investigator.code,
      skinId: item?.value || null
    }))
    setSkin(item);
  }, [])

  const changeVariant = useCallback((item: DetailItem) => {
    dispatch(setInvestigatorVariant({
      code: investigator.code,
      variantId: item?.value || null
    }))
    setVariant(item);
  }, [])

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
              onChange={changeSkin}
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