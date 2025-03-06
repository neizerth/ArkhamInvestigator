import { last } from "ramda";
import { createDigitItem } from "../lib";
import type { SkillCheckReducer } from "../skillCheck.types";

export const sendDigitSignal: SkillCheckReducer<number> = (state, { payload }) => {
  const { data } = state
  const lastItem = last(data);

  if (lastItem?.type === 'number') {
    return {
      ...state,
      data: [
        ...data.slice(0, -1),
        createDigitItem(lastItem.value * 10 + payload)
      ]
    }
  }
  if (lastItem?.type === 'stat') {
    return {
      ...state,
      data: [
        ...data.slice(0, -1),
        createDigitItem(payload)
      ]
    }
  }

  return {
    ...state,
    data: [
      ...data,
      createDigitItem(payload)
    ]
  }
}