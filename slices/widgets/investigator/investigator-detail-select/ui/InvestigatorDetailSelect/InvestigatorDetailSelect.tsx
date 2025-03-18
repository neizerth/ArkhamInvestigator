import { formatGameText, selectCurrentInvestigatorDetails, useAppDispatch, useAppSelector } from "@shared/lib";
import * as C from "./InvestigatorDetailSelect.components";
import { router } from "expo-router";
import type { Faction } from "@shared/model";
import { useCallback } from "react";
import { selectCurrentDetails, selectInvestigatorMedia } from "../../lib";
import type { InvestigatorDetailItem } from "@shared/model";
import { InvestigatorDescription } from "../investigator/InvestigatorDescription";
import { DataSectionMemo as DataSection } from "../data";
import { goBack, removeInvestigatorSelection, setCurrentInvestigatorDetails } from "@shared/lib/store";
import { propEq } from "ramda";
import { changeSkin, changeVariant, updateBoardDetails } from "../../lib/actions";
import { useAppTranslation } from "@features/i18n";

type DetailItem = InvestigatorDetailItem | null;
export const InvestigatorDetailSelect = () => {
  const dispatch = useAppDispatch();
  const { t } = useAppTranslation();
  const details = useAppSelector(selectCurrentInvestigatorDetails);
  const { 
    skin,
    skins,
    variant,
    variants, 
    investigator
  } = useAppSelector(selectCurrentDetails);

  const onChangeSkin = useCallback((item: DetailItem) => {
    dispatch(changeSkin(item));
  }, [dispatch])

  const onChangeVariant = useCallback((item: DetailItem) => {
    dispatch(changeVariant(item));
  }, [dispatch])

  const back = useCallback(() => {
    dispatch(updateBoardDetails());
    dispatch(goBack());
  }, [dispatch]);
  
  const cancel = useCallback(() => {
    dispatch(setCurrentInvestigatorDetails(null));
    dispatch(removeInvestigatorSelection());
    dispatch(goBack());
  }, [dispatch]);

  if (!investigator || !details) {
    return null;
  }

  const faction = investigator.faction_code as Faction;
  const name = t(investigator.name);
  const subname = t(investigator.subname || '')

  const formattedName = formatGameText(name);
  const formattedSubname = formatGameText(subname);

  return (
    <C.Container>
      <C.Outside onPress={cancel}/>
      <C.Content>
        <C.Outside onPress={cancel}/>
        <C.Card 
          faction={faction}
          title={formattedName}
          subtitle={formattedSubname}
          onClose={cancel}
          onOk={back}
          onCancel={cancel}
        >
          <C.Sections>
            <InvestigatorDescription
              data={details}
              variant={variant}
              skin={skin}
            />
            <DataSection
              title={t`Versions`}
              data={variants}
              selected={variant}
              onChange={onChangeVariant}
            />
            <DataSection
              title={t`Skins`}
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