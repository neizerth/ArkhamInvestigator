import type { InvestigatorBoard, InvestigatorSource, SelectedInvestigator } from "@shared/model";
import { isNotNil, propEq } from "ramda";
import { getSelectedInvestigatorVariant } from "./getSelectedInvestigatorVariant";
import { getInvestigatorBoardStats } from "./getInvestigatorStats";
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data";

type GetBoardInvestigators = {
  selectedInvestigators: SelectedInvestigator[]
  investigators: InvestigatorSource[]
  mediaItems: InvestigatorMedia[]
}

export const getInvestigatorBoards = ({
  investigators,
  selectedInvestigators,
  mediaItems
}: GetBoardInvestigators) => selectedInvestigators
  .map((item): InvestigatorBoard | null => {
    const { code } = item;
    const investigator = investigators.find(propEq(code, 'code'));
    const media = mediaItems.find(propEq(code, 'code')); 

    if (!investigator || !media) {
      return null;
    }

    const {
      picture,
      additionalAction,
      isParallel
    } = getSelectedInvestigatorVariant(item, media);

    const value = {
      ...getInvestigatorBoardStats(investigator),
      additionalAction
    }
    
    return {
      investigator,
      picture,
      baseValue: { ...value },
      value,
      isParallel
    }
  })
  .filter(isNotNil)
