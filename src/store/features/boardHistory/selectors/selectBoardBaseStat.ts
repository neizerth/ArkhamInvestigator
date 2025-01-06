import type { IBoard } from "@/types/board";
import type { AppSelector } from "@/store";

type BoardType = keyof IBoard;

export const selectBoardBaseStat = (type: BoardType): AppSelector => 
  ({ boardHistory }) => boardHistory.baseValue[type];