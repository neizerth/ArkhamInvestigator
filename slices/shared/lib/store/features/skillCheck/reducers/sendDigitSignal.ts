import { last } from "ramda";
import { createNumberItem } from "../lib";
import type { SkillCheckReducer } from "../skillCheck.types";

export const sendNumberSignal: SkillCheckReducer<number> = (state, { payload }) => {
  const { data } = state
  const lastItem = last(data);

  if (lastItem?.type === 'number') {
    return {
      ...state,
      data: [
        ...data.slice(0, -1),
        createNumberItem(lastItem.value * 10 + payload)
      ]
    }
  }
  if (lastItem?.type === 'stat') {
    return {
      ...state,
      data: [
        ...data.slice(0, -1),
        createNumberItem(payload)
      ]
    }
  }

  return {
    ...state,
    data: [
      ...data,
      createNumberItem(payload)
    ]
  }
}