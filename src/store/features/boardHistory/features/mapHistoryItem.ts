import type { IBoard, IBoardHistoryItem } from "@/types/board";

export const mapHistoryItem = ({ type, value }: IBoardHistoryItem): Partial<IBoard> => {
  return {
    [type]: value
  };
} 