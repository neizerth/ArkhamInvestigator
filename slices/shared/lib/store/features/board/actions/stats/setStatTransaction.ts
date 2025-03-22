import { InvestigatorBoardStat, InvestigatorBoardValues } from "@shared/model";
import { setBaseStat } from "./base";
import { setCurrentStat } from "./current";
import { addCurrentHistoryItem } from "../history";
import { AppThunk } from "@shared/lib/store";

const noHistory = {
  addToHistory: false
}

export const setStatTransaction = <T extends InvestigatorBoardStat>(
  statType: T,
  value: InvestigatorBoardValues[T],
  baseValue: InvestigatorBoardValues[T]
): AppThunk => 
  (dispatch) => {
    dispatch(setBaseStat(statType, value, noHistory));
    dispatch(setCurrentStat(statType, baseValue, noHistory));

    dispatch(addCurrentHistoryItem({
      value: {
        [statType]: value
      },
      baseValue: {
        [statType]: baseValue
      }
    }))
  }