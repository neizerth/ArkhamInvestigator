import { selectDeviceNetworkId } from "@modules/core/network/shared/lib";
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

	const networkId: ReturnType<typeof selectDeviceNetworkId> = yield select(
		selectDeviceNetworkId,
	);

	const withCode = propEq(code, "code");
	const hasCode = includesBy(withCode, selected);

	const isMaxPlayers = selected.length === MAX_PLAYERS;

	if (replaceCode === code) {
		console.log("Replace code is the same as the code");
		return;
	}

	if (hasCode && (!group.multiselect || isMaxPlayers)) {
		console.log("Remove selected signature by code");
		yield put(removeSelectedSignatureByCode({ code }));
		return;
	}

	if (isMaxPlayers) {
		console.log("Is max players");
		return;
	}

	const typedItems = selected.filter(withCode);

	if (typedItems.length > 0 && group.multiselect) {
		console.log("Add selected signature");
		const [item] = typedItems;
		const selection = {
			...item,
			id: v4(),
			networkId,
		};
		yield put(addSelectedSignature(selection));
		return;
	}

	if (!showDetails) {
		console.log("Add selected signature without details");
		const [signature] = group.signatures;

		yield put(
			addSelectedSignature({
				id: v4(),
				code,
				signature,
				skin: null,
				image: signature.image,
				signatureGroupId: group.id,
				networkId,
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
