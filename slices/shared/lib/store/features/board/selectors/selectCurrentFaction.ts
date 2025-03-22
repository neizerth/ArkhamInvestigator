import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentBoard } from "./selectCurrentBoard";
import type { Faction } from "@shared/model";

export const selectCurrentFaction = createSelector(
  [
    selectCurrentBoard
  ],
  board => {
    return board.investigator.faction_code as Faction
  }
)