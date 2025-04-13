import type { AppThunk } from "@shared/model";
import { routes } from "../../../../../config";
import { goToPage } from "../../../effects";
import { setReplaceInvestigator, setShowDescription } from "../../game";

export const changeInvestigator = (): AppThunk => (dispatch) => {
	dispatch(setReplaceInvestigator(true));
	dispatch(setShowDescription(false));

	setTimeout(() => {
		dispatch(goToPage(routes.selectInvestigators));
	}, 150);
};
