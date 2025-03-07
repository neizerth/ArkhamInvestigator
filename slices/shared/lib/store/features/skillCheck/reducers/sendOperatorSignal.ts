import type { SkillCheckOperator } from "@shared/model";
import type { SkillCheckReducer } from "../skillCheck.types";
import { last } from "ramda";
import { createOperatorItem } from "../lib";

export const sendOperatorSignal: SkillCheckReducer<SkillCheckOperator> = (state, { payload }) => {
  const { data } = state
  const lastItem = last(data);
  
  if (lastItem?.type === 'operator') {
    return {
      ...state,
      data: [
        ...data.slice(0, -1),
        createOperatorItem(payload)
      ]
    }
  }
  return {
    ...state,
    data: [
      ...data,
      createOperatorItem(payload)
    ]
  }
}