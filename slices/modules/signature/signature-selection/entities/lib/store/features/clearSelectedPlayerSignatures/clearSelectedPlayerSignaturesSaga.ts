import { selectDeviceNetworkId } from "@modules/core/network/shared/lib";
import { selectGameMode } from "@modules/game/shared/lib";
import {
	clearSelectedSignatures,
	selectSelectedSignatures,
	setSelectedSignatures,
} from "@modules/signature/signature-selection/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { clearSelectedPlayerSignatures } from "./clearSelectedPlayerSignatures";

function* worker() {
	const gameMode: ReturnType<typeof selectGameMode> =
		yield select(selectGameMode);
	if (gameMode !== "multiplayer") {
		yield put(clearSelectedSignatures());
		return;
	}
	const networkId: ReturnType<typeof selectDeviceNetworkId> = yield select(
		selectDeviceNetworkId,
	);
	const selectedSignatures: ReturnType<typeof selectSelectedSignatures> =
		yield select(selectSelectedSignatures);

	const signatures =
		selectedSignatures?.filter(
			(signature) => signature.networkId !== networkId,
		) ?? [];

	yield put(setSelectedSignatures(signatures));
}

export function* clearSelectedPlayerSignaturesSaga() {
	yield takeEvery(clearSelectedPlayerSignatures.match, worker);
}
