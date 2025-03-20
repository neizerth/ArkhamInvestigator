import type { AppThunk } from "@shared/lib/store";
import type  { InvestigatorBoardStat } from "@shared/model";
import { reduceBaseStat } from "./reduceBaseStat";
import { selectCurrentBoard } from "../../../selectors/selectCurrentBoard";

const minValues = {
  resources: 0,
  actions: 0,
  clues: 0
}

export const decreaseBaseStat = (
  type: InvestigatorBoardStat
): AppThunk => 
  (dispatch, getState) => {
    const state = getState();
    const { initialValue } = selectCurrentBoard(state);
    
    const values = {
      ...initialValue,
      ...minValues
    }
    const minValue = values[type];

    const reducer = (value: number) => Math.max(value - 1, minValue);
    dispatch(reduceBaseStat(type, reducer));
  }