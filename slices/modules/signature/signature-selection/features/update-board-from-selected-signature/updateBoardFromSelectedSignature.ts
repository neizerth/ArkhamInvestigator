import { selectCurrentBoard, setBoard } from "@modules/board/base/shared/lib";
import { createInvestigatorBoard } from "@modules/mechanics/board/base/entities/lib";
import { selectSignatureSettingsByCode } from "@modules/signature/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	addSelectedSignature,
	selectReplaceSignature,
	setReplaceSignature,
} from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof addSelectedSignature>) {
	const { skin, image } = payload;
	const board: ReturnType<typeof selectCurrentBoard> =
		yield select(selectCurrentBoard);

	const replace: ReturnType<typeof selectReplaceSignature> = yield select(
		selectReplaceSignature,
	);

	const { signatureGroupId } = board;

	const settingsSelector = selectSignatureSettingsByCode(signatureGroupId);
	const settings: ReturnType<typeof settingsSelector> =
		yield select(settingsSelector);

	const { physicalTrauma = 0, mentalTrauma = 0 } = settings;

	const investigator = payload.signature;

	const skinId = skin?.id;

	const { id, index } = board;

	const updatedBoard = createInvestigatorBoard({
		id,
		index,
		investigator,
		signatureGroupId,
		image,
		skinId,
		physicalTrauma,
		mentalTrauma,
	});

	yield put(
		setBoard({
			boardId: id,
			data: updatedBoard,
			history: false,
		}),
	);

	if (!replace) {
		return;
	}
	yield put(setReplaceSignature(false));
	// goBack
}

export function* updateBoardFromSelectedSignature() {
	yield takeEvery(addSelectedSignature.match, worker);
}
