import type { SkillCheckCommand } from "@shared/model";
import type { SkillCheckReducer } from "../skillCheck.types";
import { createStatItem } from "../lib";

export const sendCommandSignal: SkillCheckReducer<SkillCheckCommand> = (state, { payload }) => {
  const { type } = state;
  switch (payload) {
    case 'clear':
    case 'all-clear':
      if (!type) {
        return {
          ...state,
          data: []
        }
      }
      // const type = state.
      return {
        ...state,
        data: [
          createStatItem(type)
        ]
      }
    case 'clear-last':
      return {
        ...state,
        data: state.data.slice(0, -1)
      }
  }
}