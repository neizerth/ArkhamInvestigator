import type { SkillCheckCommand } from "@shared/model";
import type { SkillCheckReducer } from "../skillCheck.types";
import { createNumberItem, createStatItem } from "../lib";
import { last } from "ramda";

export const sendCommandSignal: SkillCheckReducer<SkillCheckCommand> = (state, { payload }) => {
  const { type, data } = state;
  
  if (!type) {
    if (!type) {
      return {
        ...state,
        data: []
      }
    }
  }

  const lastItem = last(data);

  switch (payload) {
    case 'clear':
    case 'all-clear':
      return {
        ...state,
        data: [
          createStatItem(type)
        ]
      }
    case 'clear-last':
      if (lastItem?.type === 'number' && lastItem.value > 9) {
        const value = Math.floor(lastItem.value / 10);

        return {
          ...state,
          data: [
            ...state.data.slice(0, -1),
            createNumberItem(value)
          ]
        }
      }
      return {
        ...state,
        data: state.data.slice(0, -1)
      }
  }
}