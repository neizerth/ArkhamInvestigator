import type { AppThunk } from "@shared/model";
import { propEq } from "ramda";
import { routes } from "../../../../../config";
import { delay } from "../../../../util/promise";
import { goToPage } from "../../../effects";
import { selectCurrentBoard } from "../../board/selectors/current/selectCurrentBoard";
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
		const { signatureGroupId, investigator, skinId } =
			selectCurrentBoard(state);
		const groups = selectSignatureGroups(state);
		const group = groups.find(propEq(signatureGroupId, "id"));

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
