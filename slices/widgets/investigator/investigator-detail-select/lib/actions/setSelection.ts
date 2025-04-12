import {
	addSelectedInvestigator,
	selectCurrentBoard,
	selectCurrentSignatureGroup,
} from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { v4 } from "uuid";
import {
	selectCurrentImage,
	selectCurrentSignature,
	selectCurrentSkin,
} from "../selectors";
import { cancelSelection } from "./cancelSelection";
import { updateBoardFromSelection } from "./updateBoardFromSelection";

export const setSelection = (): AppThunk => (dispatch, getState) => {
	const state = getState();
	const group = selectCurrentSignatureGroup(state);
	const signature = selectCurrentSignature(state);
	const skin = selectCurrentSkin(state);
	const image = selectCurrentImage(state);
	const board = selectCurrentBoard(state);

	dispatch(cancelSelection());

	if (!signature || !image || !group) {
		return;
	}

	const code = signature.linked_code || signature.code;
	const signatureGroupId = group.id;

	const selection = {
		id: v4(),
		code,
		signature,
		skin,
		image,
		signatureGroupId,
	};

	if (!board) {
		dispatch(addSelectedInvestigator(selection));
	}

	dispatch(updateBoardFromSelection(selection));
};
