import type { AppThunk } from "@shared/model";
import { routes } from "../../../../../config";
import { delay } from "../../../../util/promise";
import { goToPage } from "../../../effects";
import { setReplaceInvestigator, setShowDescription } from "../../game";

export const changeInvestigator = (): AppThunk => async (dispatch) => {
	dispatch(setReplaceInvestigator(true));
	dispatch(setShowDescription(false));

	await delay(150);

	dispatch(goToPage(routes.replaceInvestigator));
};
