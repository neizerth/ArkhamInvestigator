import type { AppThunk } from "@shared/model";
import type { InvestigatorAbility } from "arkham-investigator-data";
import { inc } from "ramda";
import type { DeclenseCase } from "../../../../../../../../../features";
import { i18next } from "../../../../../../../../../features/i18n/config";
import { declenseNoun } from "../../../../../../../../../features/i18n/lib/declense";
import { declenseName } from "../../../../../../../../../features/i18n/lib/declense/declenseName";
import { showToast } from "../../../../../../../../../features/notifications/lib";
import {
	selectAbilityUseInfo,
	selectBoardById,
	selectCurrentBoardProp,
} from "../../../../selectors";
import { decreaseCurrentStat, reduceCurrentStat } from "../../current";

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

		const { name, gender, locale: language, nameless } = board.investigator;
		const from = fromInvestigator.name;

		const resultCase: DeclenseCase = "dative";

		const dativeName = nameless
			? declenseNoun({
					text: name,
					language,
					resultCase,
					gender,
				})
			: declenseName({
					name,
					gender,
					language,
					resultCase,
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
