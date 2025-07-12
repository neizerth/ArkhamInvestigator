import type { AppThunk } from "@shared/model";
import {
	setCurrentSignatureGroup,
	setCurrentSignatureId,
	setCurrentSkinId,
} from "../game";

export const resetCurrentDetails = (): AppThunk => (dispatch) => {
	dispatch(setCurrentSignatureGroup(null));
	dispatch(setCurrentSkinId(null));
	dispatch(setCurrentSignatureId(null));
};
