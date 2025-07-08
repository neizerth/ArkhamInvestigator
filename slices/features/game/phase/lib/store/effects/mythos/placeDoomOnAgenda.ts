import { selectDoom, setDoom } from "@modules/board/base/shared/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import type { AppThunk } from "@shared/model";

export const placeDoomOnAgenda = (): AppThunk => (dispatch, getState) => {
	const state = getState();
	const currentDoom = selectDoom(state);
	const doom = currentDoom + 1;

	dispatch(setDoom(doom));

	dispatch(
		sendNotification({
			message: "mythos.doom",
			data: {
				doom,
			},
			duration: 5000,
		}),
	);
};
