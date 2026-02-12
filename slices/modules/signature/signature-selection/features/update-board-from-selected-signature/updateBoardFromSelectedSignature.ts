import {
	isBoardExists,
	selectCurrentBoard,
	setBoard,
} from "@modules/board/base/shared/lib";
import type { InvestigatorBoard } from "@modules/board/base/shared/model";
import { goBack } from "@modules/core/router/shared/lib";
import { createInvestigatorBoard } from "@modules/mechanics/board/base/entities/lib";
import { selectSignatureSettingsByCode } from "@modules/signature/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	addSelectedSignature,
	selectReplaceSignature,
	setReplaceSignature,
} from "../../shared/lib";

const skinChangePayload: Partial<InvestigatorBoard> = {
	loaded: false,
	loadProgress: 0,
	background: null,
	gameTextSize: null,
};

function* worker({ payload }: ReturnType<typeof addSelectedSignature>) {
	const board: ReturnType<typeof selectCurrentBoard> =
		yield select(selectCurrentBoard);

	if (!isBoardExists(board)) {
		return;
	}

	const { skin, image, signatureGroupId } = payload;

	const replace: ReturnType<typeof selectReplaceSignature> = yield select(
		selectReplaceSignature,
	);

	const settingsSelector = selectSignatureSettingsByCode(signatureGroupId);
	const settings: ReturnType<typeof settingsSelector> =
		yield select(settingsSelector);

	const { physicalTrauma = 0, mentalTrauma = 0 } = settings;

	const investigator = payload.signature;

	const skinId = skin?.id;

	const { id, index } = board;

	const isSameSignature = board.investigator.code === investigator.code;

	let data = createInvestigatorBoard({
		id,
		index,
		investigator,
		signatureGroupId,
		image,
		skinId,
		physicalTrauma,
		mentalTrauma,
	});

	if (isSameSignature) {
		data = {
			...board,
			...skinChangePayload,
			image,
			skinId,
		};
	}

	yield put(
		setBoard({
			boardId: id,
			data,
			history: false,
		}),
	);

	if (!replace) {
		return;
	}
	yield put(setReplaceSignature(false));
	yield put(goBack());

	// goBack
}

export function* updateBoardFromSelectedSignature() {
	yield takeEvery(addSelectedSignature.match, worker);
}
