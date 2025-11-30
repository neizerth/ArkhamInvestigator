import {
	selectBoardUsedAbilities,
	setBoardProp,
} from "@modules/board/base/shared/lib";
import { idIncludes } from "@shared/lib";
import { prop, reject } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { getAbilityLimits } from "../../../info";
import { selectInvestigatorAbilities } from "../../selectors";
import { resetBoardAbilities } from "./resetBoardAbilities";

function* worker({ payload }: ReturnType<typeof resetBoardAbilities>) {
	const { boardId, limitTypes = [], abilityTypes = [] } = payload;

	const usedAbilitiesSelector = selectBoardUsedAbilities(boardId);

	const usedAbilities: ReturnType<typeof usedAbilitiesSelector> = yield select(
		usedAbilitiesSelector,
	);

	if (!usedAbilities) {
		return;
	}

	const boardAbilitiesSelector = selectInvestigatorAbilities(boardId);

	const boardAbilities: ReturnType<typeof boardAbilitiesSelector> =
		yield select(boardAbilitiesSelector);

	const selectAll = limitTypes.length === 0 && abilityTypes.length === 0;

	const ids = boardAbilities
		.filter((ability) => {
			if (selectAll) {
				return true;
			}

			if (abilityTypes.length > 0) {
				return abilityTypes.includes(ability.type);
			}

			const limits = getAbilityLimits(ability);

			if (!limits) {
				return false;
			}

			return limits.some((limit) => limitTypes.includes(limit));
		})
		.map(prop("id"));

	const value = reject(idIncludes(ids), usedAbilities);

	yield put(
		setBoardProp({
			...payload,
			prop: "usedAbilities",
			value,
		}),
	);
}

export function* resetBoardAbilitiesSaga() {
	yield takeEvery(resetBoardAbilities.match, worker);
}
