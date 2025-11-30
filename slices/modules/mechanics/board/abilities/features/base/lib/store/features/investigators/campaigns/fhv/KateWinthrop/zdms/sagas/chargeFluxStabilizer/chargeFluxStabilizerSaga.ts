import {
	selectBoardAbilityValue,
	setBoardAbilityValue,
} from "@modules/board/abilities/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { chargeFluxStabilizer } from "./chargeFluxStabilizer";

const abilityId = AbilityCode.KateWinthrop.darkMatter.fluxStabilizer;

function* worker({ payload }: ReturnType<typeof chargeFluxStabilizer>) {
	const { boardId } = payload;
	const valueSelector = selectBoardAbilityValue({
		boardId,
		abilityId,
	});
	const value: ReturnType<typeof valueSelector> = yield select(valueSelector);

	yield put(
		setBoardAbilityValue({
			boardId,
			abilityId,
			value: value + 1,
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "ability.kate.darkMatter.fluxStabilizer.charge",
		}),
	);
}

export function* chargeFluxStabilizerSaga() {
	yield takeEvery(chargeFluxStabilizer.match, worker);
}
