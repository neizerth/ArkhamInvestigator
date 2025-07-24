import { createAbilityUseFilter } from "@modules/board/abilities/shared/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { openModal } from "@modules/core/modal/shared/base/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, takeEvery } from "redux-saga/effects";

const filterAction = createAbilityUseFilter(AbilityCode.KohakuNarukami);

function* worker() {
	yield put(
		openModal({
			id: CustomModalId.KohakuNarukami,
		}),
	);
}

export function* KohakuNarukamiAbilityTriggerSaga() {
	yield takeEvery(filterAction, worker);
}
