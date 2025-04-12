import type { AppThunk } from "@shared/model";
import { routes } from "../../../../../config";
import { goToPage } from "../../../effects";
import { setReplaceInvestigator, setShowDescription } from "../../game";

export const changeInvestigator = (): AppThunk => (dispatch) => {
	dispatch(setShowDescription(false));
	dispatch(setReplaceInvestigator(true));
	dispatch(goToPage(routes.selectInvestigators));
};
