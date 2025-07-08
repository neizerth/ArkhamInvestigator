import {
	isBoardExists,
	selectCurrentBoard,
} from "@modules/board/base/shared/lib";
import type { AppThunk } from "@shared/model";
import { routes } from "../../../../../config";
import { whereId } from "../../../../util";
import { delay } from "../../../../util/promise";
import { goToPage } from "../../../effects";
import {
	setCurrentSignatureGroup,
	setCurrentSignatureId,
	setCurrentSkinId,
	setShowDescription,
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
		dispatch(setShowDescription(false));

		await delay(150);

		dispatch(goToPage(routes.selectInvestigatorDetails));
	};
