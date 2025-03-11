import type { ActionCreator } from "@reduxjs/toolkit"
import { goToPage } from "@shared/lib/store/effects";
import type { AppThunk } from "@shared/lib/store"
import { setSkillCheckData, setSkillCheckType } from "../skillCheck"
import type { InvestigatorBoardStat } from "@shared/model"
import { createStatItem } from "../lib/signalItems";

export const startSkillCheck: ActionCreator<AppThunk> = (statType: InvestigatorBoardStat) => (dispatch) => {
  dispatch(setSkillCheckType(statType));
  dispatch(setSkillCheckData([
    createStatItem(statType)
  ]))
  dispatch(goToPage('/skill-check'));
}