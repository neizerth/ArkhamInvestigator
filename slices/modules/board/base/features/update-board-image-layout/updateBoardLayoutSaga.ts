import { getSignatureImageLayout } from "@modules/signature/shared/lib/common/getSignatureImageLayout";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	gameTextHeightUpdated,
	selectDescriptionBottomOffset,
} from "../../entities/description/lib";
import { selectBoardById, setBoardProp } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof gameTextHeightUpdated>) {
	const { boardId, view } = payload;
	const offsetSelector = selectDescriptionBottomOffset(boardId);
	const offsetBottom: ReturnType<typeof offsetSelector> =
		yield select(offsetSelector);

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const { image } = board;

	const value = getSignatureImageLayout({
		image,
		view,
		offsetBottom,
	});

	yield put(
		setBoardProp({
			boardId,
			prop: "imageLayout",
			value,
		}),
	);
}

export function* updateBoardImageLayoutSaga() {
	yield takeEvery(gameTextHeightUpdated.match, worker);
}
