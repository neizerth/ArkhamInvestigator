import type  { ActionCreator } from "@reduxjs/toolkit";
import { type  AppThunk, selectCurrentBoard, setCurrentBoard } from "@shared/lib/store";
import type  { InvestigatorBoardStat, InvestigatorBoardValues } from "@shared/model";
import { reduceCurrentStat } from "./reduceCurrentStatReducer";
import { dec } from "ramda";

export const decreaseCurrentStat: ActionCreator<AppThunk> = (type: InvestigatorBoardStat) => 
  (dispatch) => {
    dispatch(reduceCurrentStat(type, dec));
  }