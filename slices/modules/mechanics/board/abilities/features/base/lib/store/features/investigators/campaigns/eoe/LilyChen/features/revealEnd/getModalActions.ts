import { selectIsBoardAbilityUsed } from "@modules/board/abilities/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { skillColors } from "@shared/config";
import type { InvestigatorSkillType } from "@shared/model";
import { select } from "redux-saga/effects";

export function* getModalActions(boardId: BoardId) {
	const abilities = Object.entries(AbilityCode.LilyChen) as [
		InvestigatorSkillType,
		string,
	][];

	const modalActions: ConfirmModalAction[] = [];

	for (const [type, abilityId] of abilities) {
		const abilitySelector = selectIsBoardAbilityUsed({
			boardId,
			abilityId,
		});
		const isUsed: ReturnType<typeof abilitySelector> =
			yield select(abilitySelector);

		if (isUsed) {
			continue;
		}

		modalActions.push(
			createConfirmModalAction({
				id: abilityId,
				title: "",
				icon: type,
				primary: false,
				style: {
					backgroundColor: skillColors[type].light,
					justifyContent: "center",
				},
			}),
		);
	}

	return modalActions;
}
