import { put, select, takeEvery } from "redux-saga/effects";
import { updateBoardBackground } from "../../entities/background/updateBoardBackground";
import {
	gameTextSizeUpdated,
	selectDescriptionBottomOffset,
} from "../../entities/description/lib";
import { selectBoardById, setBoardProgress } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof gameTextSizeUpdated>) {
	const { boardId, view } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const { investigator } = board;

	if (!investigator.has_full_image) {
		yield put(
			setBoardProgress({
				boardId,
				progress: 100,
			}),
		);
		return;
	}

	const offsetSelector = selectDescriptionBottomOffset(boardId);
	const offsetBottom: ReturnType<typeof offsetSelector> =
		yield select(offsetSelector);

	const { image, loaded } = board;

	if (loaded) {
		return;
	}

	const offset = {
		right: 0,
		left: 0,
		top: 0,
		bottom: offsetBottom,
	};

	yield put(
		updateBoardBackground({
			boardId,
			image,
			view,
			offset,
		}),
	);
}

export function* updateBackgroundOnDescriptionUpdateSaga() {
	yield takeEvery(gameTextSizeUpdated.match, worker);
}
