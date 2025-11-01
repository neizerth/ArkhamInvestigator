import { goToPage } from "@modules/core/router/shared/lib/store/features/goToPage/goToPage";
import type { ActionCreator } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/model";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { propEq } from "ramda";
import { v4 } from "uuid";
// import { addSelectedInvestigator } from "./selected";
import { MAX_PLAYERS } from "../../../../../config";
import { routes } from "../../../../../config";
import { includesBy } from "../../../../util";
import { selectSelectedInvestigators, setCurrentSignatureGroup } from "../game";
import { selectReplaceCode } from "../selectors/selectReplaceCode";
import {
	addSelectedInvestigator,
	removeSelectedInvestigator,
} from "./selected";

type Options = {
	group: InvestigatorSignatureGroup;
	details?: boolean;
};

export const changeSelectedInvestigator: ActionCreator<AppThunk> =
	({ group, details = true }: Options) =>
	(dispatch, getState) => {
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

		if (!details) {
			const [signature] = group.signatures;

			dispatch(
				addSelectedInvestigator({
					id: v4(),
					code,
					signature,
					skin: null,
					image: signature.image,
					signatureGroupId: group.id,
				}),
			);

			return;
		}

		dispatch(setCurrentSignatureGroup(group));
		dispatch(goToPage(routes.selectInvestigatorDetails));
	};
