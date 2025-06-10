import {
	addChaosToken,
	selectCanAddChaosToken,
} from "@features/game/chaos-bag";
import { showToast } from "@features/notifications/lib";
import { i18next } from "@modules/core/i18n/shared/config";
import { selectCurrentBoard } from "@shared/lib";
import type { AppThunk } from "@shared/model";

export const addBlessTokenEffect =
	(count: number): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectCurrentBoard(state);

		const canAddBless = selectCanAddChaosToken("bless", count)(state);

		if (!canAddBless) {
			const message = i18next.t("ability.addBless.full");

			dispatch(showToast(message));
			return;
		}

		const { name } = board.investigator;
		const message = i18next.t("ability.addBless", {
			name,
			count,
		});
		dispatch(showToast(message));
		dispatch(addChaosToken("bless"));
	};
