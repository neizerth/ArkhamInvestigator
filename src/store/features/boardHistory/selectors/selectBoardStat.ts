import type { IBoard } from "@/types/board";
import type { AppSelector } from "@/store";

type BoardType = keyof IBoard;

export const selectBoardStat = (type: BoardType): AppSelector => 
  ({ boardHistory }) => boardHistory.value[type];