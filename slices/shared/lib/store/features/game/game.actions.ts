import type { ActionCreator } from "@reduxjs/toolkit"
import { selectSelectedInvestigators, setSelectedInvestigators } from "../game/game"
import type { SelectedInvestigator } from "@shared/model"
import { toggleBy } from "@shared/lib/util";
import { propEq, reject } from "ramda";
import type { AppThunk } from "../..";

export const changeSelectedInvestigators: ActionCreator<AppThunk> = (investigator: SelectedInvestigator) => 
  (dispatch, getState) => {
    const state = getState();
    const selected = selectSelectedInvestigators(state);

    const selectedInvestigators = toggleBy(
      propEq(investigator.code, 'code'),
      investigator,
      selected
    );

    dispatch(setSelectedInvestigators(selectedInvestigators));
  }

export const removeSelectedInvestigator: ActionCreator<AppThunk> = (code: string) => 
  (dispatch, getState) => {
    const state = getState();
    const selected = selectSelectedInvestigators(state);
    const withCode = propEq(code, 'code');
    const selectedInvestigators = reject(withCode, selected);

    dispatch(setSelectedInvestigators(selectedInvestigators));
  }

  export const addSelectedInvestigator: ActionCreator<AppThunk> = (investigator: SelectedInvestigator) => 
    (dispatch, getState) => {
      const state = getState();
      const selected = selectSelectedInvestigators(state);
  
      dispatch(setSelectedInvestigators([
        ...selected,
        investigator
      ]));
    }