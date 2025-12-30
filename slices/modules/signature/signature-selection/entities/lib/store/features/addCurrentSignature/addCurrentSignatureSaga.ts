import {
	addSelectedSignature,
	resetCurrentSignature,
	selectCurrentImage,
	selectCurrentSignature,
	selectCurrentSignatureGroup,
	selectCurrentSkin,
} from "@modules/signature/signature-selection/shared/lib";
import type { SelectedSignature } from "@modules/signature/signature-selection/shared/model";
import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { addCurrentSignature } from "./addCurrentSignature";

function* worker() {
	const group: ReturnType<typeof selectCurrentSignatureGroup> = yield select(
		selectCurrentSignatureGroup,
	);

	const signature: ReturnType<typeof selectCurrentSignature> = yield select(
		selectCurrentSignature,
	);

	const image: ReturnType<typeof selectCurrentImage> =
		yield select(selectCurrentImage);

	yield put(resetCurrentSignature());

	if (!signature || !group || !image) {
		return;
	}

	const skin: ReturnType<typeof selectCurrentSkin> =
		yield select(selectCurrentSkin);

	const code = signature.linked_code ?? signature.code;
	const signatureGroupId = group.id;

	const selection: SelectedSignature = {
		id: v4(),
		code,
		signature,
		skin,
		image,
		signatureGroupId,
	};

	yield put(addSelectedSignature(selection));
}

export function* addCurrentSignatureSaga() {
	yield takeEvery(addCurrentSignature.match, worker);
}
