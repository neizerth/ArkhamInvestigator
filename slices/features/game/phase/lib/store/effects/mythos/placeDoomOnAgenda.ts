import { selectDoom, setDoom } from "@modules/board/base/shared/lib";
import { i18next } from "@modules/core/i18n/shared/config";
import type { AppThunk } from "@shared/model";
import { showToast } from "../../../../../../notifications/lib";

export const placeDoomOnAgenda = (): AppThunk => (dispatch, getState) => {
	const state = getState();
	const currentDoom = selectDoom(state);
	const doom = currentDoom + 1;

	dispatch(setDoom(doom));

	const message = i18next.t("mythos.doom", {
		doom,
	});
	dispatch(showToast(message, 5000));
};
