import { selectCurrentInvestigatorDetails, useAppDispatch, useAppSelector } from "@shared/lib";
import * as C from "./InvestigatorDetailSelect.components";
import { router } from "expo-router";
import type { Faction } from "@shared/model";
import { useCallback } from "react";
import { selectInvestigatorMedia } from "../../lib";
import type { InvestigatorDetailItem } from "@shared/model";
import { InvestigatorDescription } from "../investigator/InvestigatorDescription";
import { DataSectionMemo as DataSection } from "../data";
import { selectSelectedInvestigators, setCurrentInvestigatorDetails } from "@shared/lib/store";
import { propEq } from "ramda";
import { changeSkin, changeVariant } from "../../lib/actions";

type DetailItem = InvestigatorDetailItem | null;
export const InvestigatorDetailSelect = () => {
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectCurrentInvestigatorDetails);
  const { skins, variants } = useAppSelector(selectInvestigatorMedia);
  const investigators = useAppSelector(selectSelectedInvestigators);

  const investigator = details?.investigator
  
  const selection = investigators.find(
    propEq(investigator?.code, 'code')
  )

  const skin = skins.find(
    propEq(selection?.skinId, 'value')
  ) || null;

  const variant = variants.find(
    propEq(selection?.variantId, 'value')
  ) || variants[0];

  const goBack = useCallback(() => {
    dispatch(setCurrentInvestigatorDetails(null));
    router.back();
  }, [dispatch]);

  const onChangeSkin = useCallback((item: DetailItem) => {
    dispatch(changeSkin({
      skinId: item?.value
    }));
  }, [dispatch])

  const onChangeVariant = useCallback((item: DetailItem) => {
    dispatch(changeVariant({
      skinId: item?.value
    }));
  }, [dispatch])

  if (!investigator) {
    return null;
  }

  const faction = investigator.faction_code as Faction;

  return (
    <C.Container>
      <C.Outside onPress={goBack}/>
      <C.Content>
        <C.Outside onPress={goBack}/>
        <C.Card 
          faction={faction}
          title={investigator.name}
          subtitle={investigator.subname}
          onClose={goBack}
        >
          <C.Sections>
            <InvestigatorDescription
              data={details}
              variant={variant}
              skin={skin}
            />
            <DataSection
              title="Variants"
              data={variants}
              selected={variant}
              onChange={onChangeVariant}
            />
            <DataSection
              title="Skins"
              data={skins}
              onChange={onChangeSkin}
              selected={skin}
              showIcon={false}
              showNone
            />
          </C.Sections>
        </C.Card>
      </C.Content>
    </C.Container>
  );
}