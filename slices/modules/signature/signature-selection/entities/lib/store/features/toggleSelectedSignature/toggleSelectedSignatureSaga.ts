import { goToPage } from "@modules/core/router/shared/lib";
import {
	addSelectedSignature,
	removeSelectedSignatureByCode,
	selectReplaceCode,
	selectSelectedSignatures,
	setCurrentSignatureGroup,
} from "@modules/signature/signature-selection/shared/lib";
import { MAX_PLAYERS, routes } from "@shared/config";
import { includesBy } from "@shared/lib";
import { propEq } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { toggleSelectedSignature } from "./toggleSelectedSignature";

function* worker({ payload }: ReturnType<typeof toggleSelectedSignature>) {
	const { group, showDetails } = payload;
	const { code } = group;

	const selectedSignatures: ReturnType<typeof selectSelectedSignatures> =
		yield select(selectSelectedSignatures);
	const selected = selectedSignatures ?? [];

	const replaceCode: ReturnType<typeof selectReplaceCode> =
		yield select(selectReplaceCode);

	const withCode = propEq(code, "code");
	const hasCode = includesBy(withCode, selected);

	const isMaxPlayers = selected.length === MAX_PLAYERS;

	if (replaceCode === code) {
		return;
	}

	if (hasCode && (!group.multiselect || isMaxPlayers)) {
		yield put(removeSelectedSignatureByCode({ code }));
		return;
	}

	if (isMaxPlayers) {
		return;
	}

	const typedItems = selected.filter(withCode);

	if (typedItems.length > 0 && group.multiselect) {
		const [item] = typedItems;
		const selection = {
			...item,
			id: v4(),
		};
		yield put(addSelectedSignature(selection));
		return;
	}

	if (!showDetails) {
		const [signature] = group.signatures;

		yield put(
			addSelectedSignature({
				id: v4(),
				code,
				signature,
				skin: null,
				image: signature.image,
				signatureGroupId: group.id,
			}),
		);

		return;
	}

	yield put(setCurrentSignatureGroup(group));
	yield put(goToPage(routes.selectInvestigatorDetails));
}

export function* toggleSelectedSignatureSaga() {
	yield takeEvery(toggleSelectedSignature.match, worker);
}
