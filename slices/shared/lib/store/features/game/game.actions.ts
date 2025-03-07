import { createAction, type ActionCreator } from "@reduxjs/toolkit"
import { selectSelectedInvestigators, setCurrentInvestigatorDetails, setSelectedInvestigators } from "../game/game"
import type { InvestigatorDetails, SelectedInvestigator } from "@shared/model"
import { includesBy, toggleBy } from "@shared/lib/util";
import { propEq, reject } from "ramda";
import type { AppThunk } from "../..";
import { MAX_PLAYERS } from "@shared/config";
import { router } from "expo-router";
import { navigateTo, replaceTo } from "@shared/lib/store/effects";
import { v4 } from "uuid";

export const changeSelectedInvestigator: ActionCreator<AppThunk> = (item: InvestigatorDetails) => 
  (dispatch, getState) => {
    const state = getState();
    const selected = selectSelectedInvestigators(state);

    const { investigator, media } = item
    const { code } = investigator;
    const withCode = propEq(code, 'code');
    const hasCode = includesBy(withCode, selected);

    const isMaxPlayers = selected.length === MAX_PLAYERS;
    const isMultiselect = media?.multiselect;

    if (hasCode && (!isMultiselect || isMaxPlayers)) {
      return dispatch(removeSelectedInvestigator(code))
    }

    if (isMaxPlayers) {
      return;
    }

    const selectedItem = {
      id: v4(),
      code
    }
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