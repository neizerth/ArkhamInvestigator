import { createSelector } from "@reduxjs/toolkit";
import { selectReplaceInvestigator, selectSelectedInvestigators } from "../game";
import { selectReplaceCode } from "./selectReplaceCode";
import { prop, propEq, reject } from "ramda";
import { propIncludes } from "@shared/lib/util";
import { selectInvestigatorBoards } from "../../board";

export const selectFocusedInvestigators = createSelector(
  [
    selectSelectedInvestigators,
    selectReplaceCode,
    selectInvestigatorBoards,
  ],
  (selected, replaceCode, boards) => {
    if (!replaceCode) {
      return selected
    }
    
    const disabled = boards
      .map(({ investigator }) => investigator.code)
      .filter(code => code !== replaceCode)

    return reject(
      propIncludes('code', disabled), 
      selected
    ).slice(0, 1);
  }
)