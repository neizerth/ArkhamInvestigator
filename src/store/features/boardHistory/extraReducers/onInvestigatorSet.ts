import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { IBoardHistoryState } from "../boardHistory";
import { setInvesigator } from "../../investigator/investigator";
import { DEFAULT_ACTIONS_COUNT, DEFAULT_RESOURCES_COUNT } from "@/config/app";

export const onInvestigatorSet = (builder: ActionReducerMapBuilder<IBoardHistoryState>) => 
  builder.addCase(setInvesigator, (state, { payload }) => {

    if (!payload) {
      return {
        ...state,
        baseValue: null,
        value: null,
        history: [],
        index: 0
      };
    }
    const {
      health,
      sanity,
      skill_willpower,
      skill_agility,
      skill_combat,
      skill_intellect
    } = payload;

    const baseValue = {
      health,
      sanity,
      willpower: skill_willpower,
      agility: skill_agility,
      combat: skill_combat,
      intellect: skill_intellect,
      clues: 0,
      actions: DEFAULT_ACTIONS_COUNT,
      resources: DEFAULT_RESOURCES_COUNT
    };

    return {
      ...state,
      baseValue,
      value: baseValue
    }
  })