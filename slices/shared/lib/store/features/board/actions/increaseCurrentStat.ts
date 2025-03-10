import type  { ActionCreator } from "@reduxjs/toolkit";
import { type  AppThunk, selectCurrentBoard, setCurrentBoard } from "@shared/lib/store";
import type  { InvestigatorBoardStat, InvestigatorBoardValues } from "@shared/model";
import { reduceCurrentStat } from "./reduceCurrentStatReducer";
import { inc } from "ramda";

export const increaseCurrentStat: ActionCreator<AppThunk> = (
  type: InvestigatorBoardStat,
  maxValue = Number.POSITIVE_INFINITY
) => 
  (dispatch) => {
    dispatch(
      reduceCurrentStat(
        type, 
        (value: number) => Math.min(value + 1, maxValue)
      )
    );
  }