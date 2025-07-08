import {
	isBoardExists,
	selectCurrentBoard,
} from "@modules/board/base/shared/lib";
import type { AppThunk } from "@shared/model";
import { routes } from "../../../../../config";
import { whereId } from "../../../../util";
import { goToPage } from "../../../effects";
import {
	setCurrentSignatureGroup,
	setCurrentSignatureId,
	setCurrentSkinId,
} from "../../game";
import { selectSignatureGroups } from "../investigators";

export const changeInvestigatorDetails =
	(): AppThunk => async (dispatch, getState) => {
		const state = getState();
		const board = selectCurrentBoard(state);
		if (!isBoardExists(board)) {
			return;
		}
		const { signatureGroupId, investigator, skinId } = board;
		const groups = selectSignatureGroups(state);
		const group = groups.find(whereId(signatureGroupId));

		if (!group) {
			return;
		}

		dispatch(setCurrentSignatureGroup(group));
		dispatch(setCurrentSignatureId(investigator.id));
		dispatch(setCurrentSkinId(skinId || null));

		dispatch(goToPage(routes.selectInvestigatorDetails));
	};
