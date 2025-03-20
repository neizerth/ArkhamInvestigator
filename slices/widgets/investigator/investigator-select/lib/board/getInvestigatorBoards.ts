import type { InvestigatorBoard, InvestigatorSource, SelectedInvestigator } from "@shared/model";
import { isNotNil, propEq } from "ramda";
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data";
import { NEW_TURN_ACTIONS_COUNT, START_GAME_RESOURCES_COUNT } from "@shared/config";
import { getSelectedInvestigatorOptions } from "@shared/lib";
import { getBoardStats } from "@shared/lib/features/game/board/getBoardStats";

type GetInvestigatorBoards = {
  selectedInvestigators: SelectedInvestigator[]
  investigators: InvestigatorSource[]
  mediaItems: InvestigatorMedia[]
}

export const getInvestigatorBoards = ({
  investigators,
  selectedInvestigators,
  mediaItems
}: GetInvestigatorBoards) => selectedInvestigators
  .map((item, index): InvestigatorBoard | null => {
    const { code, details } = item;
    const investigator = investigators.find(propEq(code, 'code'));
    const media = mediaItems.find(propEq(code, 'code')); 

    if (!investigator || !media) {
      return null;
    }

    const {
      picture,
      additionalAction,
      isParallel
    } = getSelectedInvestigatorOptions({
      selection: item,
      media,
      details
    });

    const unique = Boolean(!media.multiselect);

    const value = {
      ...getBoardStats(investigator),
      additionalAction,
      resources: START_GAME_RESOURCES_COUNT,
      actions: NEW_TURN_ACTIONS_COUNT,
      clues: 0
    }
    const id = index + 1;
    
    return {
      id,
      investigator,
      picture,
      baseValue: { ...value },
      value,
      isParallel,
      unique,
      history: [],
      checkHistory: [],
      historyIndex: -1,
      details,
      selection: item
    }
  })
  .filter(isNotNil)
