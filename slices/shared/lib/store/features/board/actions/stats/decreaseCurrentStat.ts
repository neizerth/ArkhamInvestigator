import type  { ActionCreator } from "@reduxjs/toolkit";
import { type  AppThunk, selectCurrentBoard, setCurrentBoard, setCurrentStat } from "@shared/lib/store";
import type  { InvestigatorBoardStat, InvestigatorBoardValues } from "@shared/model";
import { reduceCurrentStat } from "./reduceCurrentStat";

export const decreaseCurrentStat: ActionCreator<AppThunk> = (
  type: InvestigatorBoardStat,
  minValue: number
) => 
  (dispatch) => {
    dispatch(
      reduceCurrentStat(
        type, 
        (value: number) => Math.max(value - 1, minValue)
      )
    );
  }