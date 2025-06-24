import type { InvestigatorBoardUsedAbility } from "@modules/board/abilities/shared/model";
import { boardHistoryItemAdded } from "@modules/board/history/shared/lib";
import { whereId } from "@shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { difference, isNotNil } from "ramda";
import { take } from "redux-saga/effects";
import {
	type ChangedInvestigatorBoardUsedAbility,
	changeBoardHistoryAbilityUse,
} from "../../actions";

export function* changeBoardHistoryAbilityUseSaga() {
	const payload: ActionCreatorPayload<typeof boardHistoryItemAdded> =
		yield take(boardHistoryItemAdded);

	const { board, item } = payload;

	if (!item.usedAbilities) {
		return;
	}

	const usedAbilities = board.usedAbilities || [];

	const diffRight = difference(usedAbilities, item.usedAbilities);
	const diffLeft = difference(item.usedAbilities, usedAbilities);

	const changedAbilitiesRight = diffRight.map(
		mapUsedAbility({
			isUsed: true,
			usedAbilities,
		}),
	);

	const changedAbilitiesLeft = diffLeft.map(
		mapUsedAbility({
			isUsed: false,
			usedAbilities,
		}),
	);

	const changedAbilities = [
		...changedAbilitiesRight,
		...changedAbilitiesLeft,
	].filter(isNotNil);

	if (changedAbilities.length === 0) {
		return;
	}

	yield changeBoardHistoryAbilityUse({
		...payload,
		changedAbilities,
	});
}

type MapUsedAbilityOptions = {
	isUsed: boolean;
	usedAbilities: InvestigatorBoardUsedAbility[];
};

const mapUsedAbility =
	({ isUsed, usedAbilities }: MapUsedAbilityOptions) =>
	(
		change: InvestigatorBoardUsedAbility,
	): ChangedInvestigatorBoardUsedAbility | null => {
		const prevItem = usedAbilities.find(whereId(change.id));

		if (!prevItem) {
			return {
				...change,
				isUsed,
			};
		}

		if (!change.boardIds || !prevItem.boardIds) {
			return null;
		}

		const boardIds = isUsed
			? difference(change.boardIds, prevItem.boardIds)
			: difference(prevItem.boardIds, change.boardIds);

		return {
			...change,
			boardIds,
			isUsed,
		};
	};
