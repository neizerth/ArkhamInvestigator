import { selectCurrentInvestigatorDetails, useAppDispatch, useAppSelector } from "@shared/lib";
import { Container, Content, Card, Sections } from "./InvestigatorDetailSelect.components";
import { router } from "expo-router";
import type { Faction } from "@shared/model";
import { useCallback, useMemo, useRef, useState } from "react";
import { getSkins, getVariants, selectInvestigatorMedia } from "../../lib";
import type { InvestigatorDetailItem } from "../../model";
import { Outside } from "@shared/ui";
import { InvestigatorDescription } from "../investigator/InvestigatorDescription";
import { DataSectionMemo as DataSection } from "../data";
import { selectSelectedInvestigators, setCurrentInvestigatorDetails, setInvestigatorSkin, setInvestigatorVariant } from "@shared/lib/store";
import { propEq } from "ramda";

type DetailItem = InvestigatorDetailItem | null;
export const InvestigatorDetailSelect = () => {
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectCurrentInvestigatorDetails);
  const { skins, variants } = useAppSelector(selectInvestigatorMedia);
  const investigators = useAppSelector(selectSelectedInvestigators);

  if (!details) {
    return null;
  }

  const { investigator } = details
  const { code } = investigator
  const selection = investigators.find(propEq(code, 'code'))

  if (!selection) {
    return null;
  }

  const { skinId, variantId } = selection;
  const skin = skins.find(propEq(skinId, 'value')) || null;
  const variant = variants.find(propEq(variantId, 'value')) || variants[0];

  const faction = investigator.faction_code as Faction;

  const goBack = useCallback(() => {
    dispatch(setCurrentInvestigatorDetails(null));
    router.back();
  }, [dispatch]);

  const changeSkin = useCallback((item: DetailItem) => {
    dispatch(setInvestigatorSkin({
      code,
      skinId: item?.value || null
    }))
  }, [dispatch, code])

  const changeVariant = useCallback((item: DetailItem) => {
    dispatch(setInvestigatorVariant({
      code,
      variantId: item?.value || null
    }))
  }, [dispatch, code])

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
              selected={variant}
              onChange={changeVariant}
            />
            <DataSection
              title="Skins"
              data={skins}
              onChange={changeSkin}
              selected={skin}
              showIcon={false}
              showNone
            />
          </Sections>
        </Card>
      </Content>
    </Container>
  );
}