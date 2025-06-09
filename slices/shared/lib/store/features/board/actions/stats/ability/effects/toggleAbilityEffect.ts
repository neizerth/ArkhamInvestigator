import type { AppThunk, InvestigatorBoardNumericStat } from "@shared/model";
import { prop } from "ramda";
import { addChaosToken } from "../../../../../../../../../features/game/chaos-bag/lib/store/features/chaosBag/actions/token/addChaosToken";
import { selectCanAddChaosToken } from "../../../../../../../../../features/game/chaos-bag/lib/store/features/chaosBag/selectors/contents/selectCanAddChaosToken";
import { i18next } from "../../../../../../../../../features/i18n/config";
import { showToast } from "../../../../../../../../../features/notifications/lib";
import { whereId } from "../../../../../../../util";
import { setShowFactionSelect } from "../../../../board";
import { selectCurrentBoard } from "../../../../selectors";
import { decreaseCurrentStat, increaseCurrentStat } from "../../current";

type Options = {
	abilityId: string;
	isUsed: boolean;
};

type LilyAbility = {
	id: string;
	stat: InvestigatorBoardNumericStat;
};

const lilyAbilities: LilyAbility[] = [
	{
		id: "alignment-of-spirit",
		stat: "willpower",
	},
	{
		id: "quiescence-of-thought",
		stat: "intellect",
	},
	{
		id: "prescience-of-fate",
		stat: "combat",
	},
	{
		id: "balance-of-body",
		stat: "agility",
	},
];

const lilyIds = lilyAbilities.map(prop("id"));

export const toggleAbilityEffect =
	({ abilityId, isUsed }: Options): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectCurrentBoard(state);
		// Lola Hayes
		if (!isUsed && abilityId === "role-switch") {
			dispatch(setShowFactionSelect(true));
			return;
		}
		// Sister Mary
		if (!isUsed && abilityId === "add-bless") {
			const canAddBless = selectCanAddChaosToken("bless")(state);

			if (!canAddBless) {
				const message = i18next.t("ability.addBless.full");

				dispatch(showToast(message));
				return;
			}

			const { name } = board.investigator;
			const message = i18next.t("ability.addBless", {
				name,
			});
			dispatch(showToast(message));
			dispatch(addChaosToken("bless"));
		}
		// Lily Chen
		if (lilyIds.includes(abilityId)) {
			const item = lilyAbilities.find(whereId(abilityId));
			if (!item) {
				return;
			}

			const action = isUsed
				? increaseCurrentStat(item.stat)
				: decreaseCurrentStat(item.stat);

			dispatch(action);
			return;
		}
	};
