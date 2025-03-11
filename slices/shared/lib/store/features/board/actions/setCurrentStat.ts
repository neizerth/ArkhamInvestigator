import type  { ActionCreator } from "@reduxjs/toolkit";
import { type  AppThunk, selectCurrentBoard, setCurrentBoard } from "@shared/lib/store";
import type  { InvestigatorBoardStat, InvestigatorBoardValues } from "@shared/model";
import { v4 } from "uuid";
import { reduceCurrentStat } from "./reduceCurrentStatReducer";
import { always } from "ramda";

export const setCurrentStat: ActionCreator<AppThunk> = <T extends keyof InvestigatorBoardValues>(
  type: T, 
  value: InvestigatorBoardValues[T]
) => dispatch => dispatch(reduceCurrentStat(type, always(value)));