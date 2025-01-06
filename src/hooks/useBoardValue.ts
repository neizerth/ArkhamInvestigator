import type { IBoard } from "@/types/board";
import { useAppDispatch } from "./useAppDispatch";
import { createBoardValueSetter } from "@/store/features/boardHistory/actionCreators/createBoardValueSetter";
import { useCallback } from "react";
import { useAppSelector } from "./useAppSelector";
import { selectBoardBaseValue, selectBoardValue } from "@/store/features/boardHistory/boardHistory";

export const useBoardValueSetter = (type: keyof IBoard) => {
  const dispatch = useAppDispatch();
  const boardValue = useAppSelector(selectBoardValue);
  const baseValue = useAppSelector(selectBoardBaseValue);
  const value = boardValue[type];
  const defaultValue = baseValue[type];

  const setValue = useCallback((value: number) => {
    const createAction = createBoardValueSetter(type);
    console.log({
      type,
      value
    })
    dispatch(createAction(value));
  }, [type, dispatch]);

  return [value, setValue, defaultValue] as [typeof value, typeof setValue, typeof defaultValue];
}