import { createAbilityUseFilter } from "@modules/board/abilities/shared/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import type {
	BaseModalAction,
	BaseModalData,
} from "@modules/core/modal/shared/base/model";
import { openCustomModal } from "@modules/core/modal/shared/custom/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { isNotNil } from "ramda";
import { put, takeEvery } from "redux-saga/effects";
import { ModalAction } from "./actions";
import { type SelectDataReturnType, selectData } from "./selectData";

const filterAction = createAbilityUseFilter({
	id: AbilityCode.KohakuNarukami,
	isUsed: false,
});

function* worker() {
	const { canRemove2Tokens, canAddBless, canAddCurse }: SelectDataReturnType =
		yield selectData();

	const actions: BaseModalAction[] = [
		canRemove2Tokens ? ModalAction.removeTokens : null,
		canAddBless ? ModalAction.addBless : null,
		canAddCurse ? ModalAction.addCurse : null,
	].filter(isNotNil);

	const data: BaseModalData<BaseModalAction> = {
		title: "Get action",
		faction: "mystic",
		actions,
	};

	yield put(
		openCustomModal({
			id: CustomModalId.KohakuNarukami,
			data,
		}),
	);
}

export function* KohakuNarukamiAbilityTriggerSaga() {
	yield takeEvery(filterAction, worker);
}
