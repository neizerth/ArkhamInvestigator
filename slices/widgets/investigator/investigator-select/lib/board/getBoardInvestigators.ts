import type { InvestigatorBoard, InvestigatorSource, SelectedInvestigator } from "@shared/model";
import { isNotNil, propEq } from "ramda";
import { getSelectedInvestigatorVariant } from "./getSelectedInvestigatorVariant";
import { getInvestigatorBoardStats } from "./getInvestigatorStats";
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data";
import { NEW_TURN_ACTIONS_COUNT, START_GAME_RESOURCES_COUNT } from "@shared/config";

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

    const unique = Boolean(!media.multiselect);

    const value = {
      ...getInvestigatorBoardStats(investigator),
      additionalAction,
      resources: START_GAME_RESOURCES_COUNT,
      actions: NEW_TURN_ACTIONS_COUNT,
      clues: 0
    }
    
    return {
      investigator,
      picture,
      baseValue: { ...value },
      value,
      isParallel,
      unique,
      history: [],
      checkHistory: []
    }
  })
  .filter(isNotNil)
