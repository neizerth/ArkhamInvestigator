import { showToast } from "@features/notifications/lib";
import { i18next } from "@modules/i18n/config";
import { declenseName } from "@modules/i18n/shared/lib";
import {
	decreaseCurrentStat,
	reduceCurrentStat,
	selectAbilityUseInfo,
	selectBoardById,
	selectCurrentBoardProp,
} from "@shared/lib";
import type { AppThunk } from "@shared/model";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { inc } from "ramda";

type Options = {
	boardId: number;
	ability: InvestigatorAbility;
};

export const giveActionToBoard =
	({ boardId, ability }: Options): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const useInfo = selectAbilityUseInfo(ability.id)(state);
		const fromInvestigator = selectCurrentBoardProp("investigator")(state);
		const board = selectBoardById(boardId)(state);

		if (!board) {
			return;
		}

		const boardIds = useInfo?.boardIds || [];

		dispatch(
			reduceCurrentStat({
				type: "actions",
				reducer: inc,
				options: {
					addToHistory: false,
					boardId,
				},
			}),
		);

		const { name, gender, locale: language, dative_name } = board.investigator;
		const from = fromInvestigator.name;

		const dativeName = dative_name
			? dative_name
			: declenseName({
					name,
					gender,
					language,
					resultCase: "dative",
				});

		const message = i18next.t("actions.give", {
			from,
			name,
			dativeName,
			count: 1,
		});

		dispatch(showToast(message));

		const minDecreaseCount = ability.additionalAction ? 1 : 0;

		if (boardIds.length < minDecreaseCount) {
			return;
		}

		dispatch(decreaseCurrentStat("actions"));
	};
