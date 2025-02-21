import type { ActionCreator } from "@reduxjs/toolkit"
import { selectSelectedInvestigators, setCurrentInvestigatorDetails, setSelectedInvestigators } from "../game/game"
import type { InvestigatorDetails, SelectedInvestigator } from "@shared/model"
import { includesBy, toggleBy } from "@shared/lib/util";
import { propEq, reject } from "ramda";
import type { AppThunk } from "../..";
import { MAX_PLAYERS } from "@shared/config";
import { router } from "expo-router";
import { navigateTo } from "@shared/lib/actions";

export const changeSelectedInvestigator: ActionCreator<AppThunk> = (item: InvestigatorDetails) => 
  (dispatch, getState) => {
    const state = getState();
    const selected = selectSelectedInvestigators(state);

    const { investigator, media } = item
    const { code } = investigator;
    const withCode = propEq(code, 'code');
    const hasCode = includesBy(withCode, selected);

    if (hasCode) {
      return dispatch(removeSelectedInvestigator(code))
    }

    if (selected.length === MAX_PLAYERS) {
      return;
    }

    const selectedItem = { code }
    dispatch(addSelectedInvestigator(selectedItem))

    if (media?.skins || media?.variants) {
      dispatch(navigateTo('/investigator-details'))
      dispatch(setCurrentInvestigatorDetails(item));
      return;
    }
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

  export const clearSelectedInvestigators: ActionCreator<AppThunk> = () => 
    (dispatch) => dispatch(setSelectedInvestigators([]));