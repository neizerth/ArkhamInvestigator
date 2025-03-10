import type  { ActionCreator } from "@reduxjs/toolkit";
import { type  AppThunk, selectCurrentBoard, setCurrentBoard } from "@shared/lib/store";
import type  { InvestigatorBoardStat, InvestigatorBoardValues } from "@shared/model";
import { reduceCurrentStat } from "./reduceCurrentStatReducer";
import { inc } from "ramda";

export const increaseCurrentStat: ActionCreator<AppThunk> = (type: InvestigatorBoardStat) => 
  (dispatch) => {
    dispatch(reduceCurrentStat(type, inc));
  }