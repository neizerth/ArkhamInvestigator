import type { AppThunk } from "@/store";
import type { IBoard } from "@/types/board";
import type { ActionCreator } from "@reduxjs/toolkit";
import { pushBoardHistory } from "./pushBoardHistory";

export const createBoardValueSetter = (type: keyof IBoard): ActionCreator<AppThunk> => 
  (value: number) => 
    (dispatch) => dispatch(pushBoardHistory(type, value));