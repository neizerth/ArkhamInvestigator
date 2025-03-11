import { selectCurrentInvestigatorDetails, useAppDispatch, useAppSelector } from "@shared/lib";
import * as C from "./InvestigatorDetailSelect.components";
import { router } from "expo-router";
import type { Faction } from "@shared/model";
import { useCallback } from "react";
import { selectInvestigatorMedia } from "../../lib";
import type { InvestigatorDetailItem } from "@shared/model";
import { InvestigatorDescription } from "../investigator/InvestigatorDescription";
import { DataSectionMemo as DataSection } from "../data";
import { selectCurrentBoard, selectSelectedInvestigators, setBoardDetails, setCurrentInvestigatorDetails, setInvestigatorSkin, setInvestigatorVariant } from "@shared/lib/store";
import { propEq } from "ramda";

type DetailItem = InvestigatorDetailItem | null;
export const InvestigatorDetailSelect = () => {
  const dispatch = useAppDispatch();
  const details = useAppSelector(selectCurrentInvestigatorDetails);
  const { skins, variants } = useAppSelector(selectInvestigatorMedia);
  const investigators = useAppSelector(selectSelectedInvestigators);
  const board = useAppSelector(selectCurrentBoard);

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
    if (board) {
      dispatch(setBoardDetails({
        skinId: item?.value
      }));
    }
    dispatch(setInvestigatorSkin({
      code,
      skinId: item?.value || null
    }))
  }, [dispatch, code, board])

  const changeVariant = useCallback((item: DetailItem) => {
    if (board) {
      dispatch(setBoardDetails({
        variantId: item?.value
      }));
    }
    dispatch(setInvestigatorVariant({
      code,
      variantId: item?.value || null
    }))
  }, [dispatch, code, board])

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
          </C.Sections>
        </C.Card>
      </C.Content>
    </C.Container>
  );
}