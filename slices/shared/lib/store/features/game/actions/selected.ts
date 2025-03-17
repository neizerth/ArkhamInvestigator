import type { ActionCreator } from "@reduxjs/toolkit"
import { selectCurrentInvestigatorDetails, selectSelectedInvestigators, setCurrentInvestigatorDetails, setSelectedInvestigators } from "../game"
import type { InvestigatorDetails, SelectedInvestigator } from "@shared/model"
import { includesBy } from "@shared/lib/util";
import { propEq, reject } from "ramda";
import { MAX_PLAYERS } from "@shared/config";
import { router } from "expo-router";
import { goToPage } from "@shared/lib/store/effects";
import { v4 } from "uuid";
import type { AppThunk } from "../../../";
import { selectReplaceCode } from '../selectors/selectReplaceCode'

export const changeSelectedInvestigator: ActionCreator<AppThunk> = (details: InvestigatorDetails) => 
  (dispatch, getState) => {
    const state = getState();
    const selected = selectSelectedInvestigators(state);
    const replaceCode = selectReplaceCode(state);

    const { investigator, media } = details
    const { code } = investigator;
    const withCode = propEq(code, 'code');
    const hasCode = includesBy(withCode, selected);

    const isMaxPlayers = selected.length === MAX_PLAYERS;
    const isMultiselect = media?.multiselect;

    if (replaceCode === code) {
      return;
    }

    if ((hasCode && (!isMultiselect || isMaxPlayers))) {
      dispatch(removeSelectedInvestigator(code))
      return;
    }

    if (isMaxPlayers) {
      return;
    }

    const selectedItem: SelectedInvestigator = {
      id: v4(),
      code,
      details,
      variantId: null,
      skinId: null,
    }
    
    if (replaceCode) {
      dispatch(setSelectedInvestigators([selectedItem]))
    }
    else {
      dispatch(addSelectedInvestigator(selectedItem))
    }

    if (media?.skins || media?.variants) {
      dispatch(goToPage('/investigator-details'))
      dispatch(setCurrentInvestigatorDetails(details));
      return;
    }
  }

export const removeInvestigatorSelection: ActionCreator<AppThunk> = () => 
  (dispatch, getState) => {
    const details = selectCurrentInvestigatorDetails(getState());

    if (!details) {
      return;
    }
    
    const { investigator } = details;

    if (!investigator) {
      return;
    }

    const { code } = investigator;

    dispatch(removeSelectedInvestigator(code));
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