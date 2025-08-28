import { getSignatureImageLayout } from "@modules/signature/base/shared/lib/common/getSignatureImageLayout";
import {
	createSignatureCacheGroup,
	signatureCacheGroupCreated,
} from "@modules/signature/signature-image-cache/entities/createSignatureCacheGroup";
import { put, select, take, takeEvery } from "redux-saga/effects";
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

	const layout = getSignatureImageLayout({
		image,
		view,
		offsetBottom,
	});

	yield put(
		createSignatureCacheGroup({
			image,
			type: "full",
			view,
			layout,
		}),
	);

	yield take(signatureCacheGroupCreated.match);

	yield put(
		setBoardProp({
			boardId,
			prop: "imageLayout",
			value: layout.crop,
		}),
	);
}

export function* updateBoardImageSaga() {
	yield takeEvery(gameTextHeightUpdated.match, worker);
}
