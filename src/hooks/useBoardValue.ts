import type { IBoard } from "@/types/board";
import { useAppDispatch } from "./useAppDispatch";
import { useCallback } from "react";
import { useAppSelector } from "./useAppSelector";
import { pushBoardHistory, selectBoardBaseStat, selectBoardStat } from "@/store/features/boardHistory/boardHistory";

type HookReturnValue = [number, (value: number) => void, number];

export const useBoardValue = (type: keyof IBoard) => {
  const dispatch = useAppDispatch();
  const value = useAppSelector(
    selectBoardStat(type)
  );
  const defaultValue = useAppSelector(
    selectBoardBaseStat(type)
  );

  const setValue = useCallback((value: number) => {
    dispatch(pushBoardHistory(type, value));
  }, [type, dispatch]);

  return [value, setValue, defaultValue] as HookReturnValue;
}