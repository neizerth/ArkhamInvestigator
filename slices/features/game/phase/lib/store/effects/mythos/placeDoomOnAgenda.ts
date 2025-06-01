import { selectDoom, setDoom } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { i18next } from "../../../../../../i18n/config";
import { showToast } from "../../../../../../notifications";

export const placeDoomOnAgenda = (): AppThunk => (dispatch, getState) => {
	const state = getState();
	const currentDoom = selectDoom(state);
	const doom = currentDoom + 1;
	dispatch(setDoom(currentDoom));

	const message = i18next.t("mythos.doom", {
		doom,
	});
	dispatch(showToast(message, 5000));
};
