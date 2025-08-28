import {
	createSignatureCacheGroup,
	signatureCacheGroupCreated,
} from "@modules/signature/signature-image-cache/entities/createSignatureCacheGroup";
import { put, select, take, takeEvery } from "redux-saga/effects";
import {
	gameTextSizeUpdated,
	selectDescriptionBottomOffset,
} from "../../entities/description/lib";
import { selectBoardById } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof gameTextSizeUpdated>) {
	const { boardId, view } = payload;
	const offsetSelector = selectDescriptionBottomOffset(boardId);
	const offsetBottom: ReturnType<typeof offsetSelector> =
		yield select(offsetSelector);

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const { image } = board;

	yield put(
		createSignatureCacheGroup({
			image,
			type: "full",
			view,
			offset: {
				right: 0,
				left: 0,
				top: 0,
				bottom: offsetBottom,
			},
		}),
	);

	yield take(signatureCacheGroupCreated.match);

	// yield put(
	// 	setBoardProp({
	// 		boardId,
	// 		prop: "imageLayout",
	// 		value: layout.crop,
	// 	}),
	// );
}

export function* updateBoardImageSaga() {
	yield takeEvery(gameTextSizeUpdated.match, worker);
}
