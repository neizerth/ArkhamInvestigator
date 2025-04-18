import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk, SelectedInvestigator } from "@shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { propEq, reject } from "ramda";
import { v4 } from "uuid";
import { MAX_PLAYERS, routes } from "../../../../../config";
import { includesBy } from "../../../../util";
import { goToPage } from "../../../effects";
import {
	selectSelectedInvestigators,
	setCurrentSignatureGroup,
	setSelectedInvestigators,
} from "../game";
import { selectReplaceCode } from "../selectors/selectReplaceCode";

export const changeSelectedInvestigator: ActionCreator<AppThunk> =
	(group: InvestigatorSignatureGroup) => (dispatch, getState) => {
		const state = getState();
		const selected = selectSelectedInvestigators(state);
		const replaceCode = selectReplaceCode(state);

		const { code } = group;
		const withCode = propEq(code, "code");
		const hasCode = includesBy(withCode, selected);

		const isMaxPlayers = selected.length === MAX_PLAYERS;

		if (replaceCode === code) {
			return;
		}

		if (hasCode && (!group.multiselect || isMaxPlayers)) {
			dispatch(removeSelectedInvestigator(code));
			return;
		}

		if (isMaxPlayers) {
			return;
		}

		const typedItems = selected.filter(propEq(group.code, "code"));

		if (typedItems.length > 0 && group.multiselect) {
			const selection = {
				...typedItems[0],
				id: v4(),
			};
			dispatch(addSelectedInvestigator(selection));
			return;
		}

		dispatch(goToPage(routes.selectInvestigatorDetails));
		dispatch(setCurrentSignatureGroup(group));
	};

export const removeSelectedInvestigator: ActionCreator<AppThunk> =
	(code: string) => (dispatch, getState) => {
		const state = getState();
		const selected = selectSelectedInvestigators(state);
		const withCode = propEq(code, "code");
		const selectedInvestigators = reject(withCode, selected);

		dispatch(setSelectedInvestigators(selectedInvestigators));
	};

export const addSelectedInvestigator =
	(investigator: SelectedInvestigator): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const selected = selectSelectedInvestigators(state);

		dispatch(setSelectedInvestigators([...selected, investigator]));
	};

export const clearSelectedInvestigators: ActionCreator<AppThunk> =
	() => (dispatch) =>
		dispatch(setSelectedInvestigators([]));
