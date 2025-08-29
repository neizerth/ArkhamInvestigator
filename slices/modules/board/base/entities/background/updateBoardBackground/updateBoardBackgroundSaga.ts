import { setBoardProp } from "@modules/board/base/shared/lib";
import {
	createSignatureCacheGroup,
	signatureCacheGroupCreated,
} from "@modules/signature/signature-image-cache/entities/createSignatureCacheGroup";
import {
	selectSignatureCacheGroupByCode,
	validateImageCache,
} from "@modules/signature/signature-image-cache/shared/lib";
import { put, select, take, takeEvery } from "redux-saga/effects";
import {
	boardBackgroundUpdated,
	updateBoardBackground,
} from "./updateBoardBackground";

function* worker({ payload }: ReturnType<typeof updateBoardBackground>) {
	const { boardId } = payload;
	const code = payload.image.id;

	const cacheSelector = selectSignatureCacheGroupByCode({
		type: "full",
		code,
	});

	const cache: ReturnType<typeof cacheSelector> = yield select(cacheSelector);

	const valid =
		!!cache &&
		validateImageCache({
			cache: cache.color,
			data: payload,
		});

	if (cache && valid) {
		yield put(
			setBoardProp({
				boardId,
				prop: "background",
				value: {
					color: cache.color.uri,
					grayscale: cache.grayscale.uri,
				},
			}),
		);

		yield put(boardBackgroundUpdated(payload));
		return;
	}

	yield put(
		createSignatureCacheGroup({
			...payload,
			type: "full",
		}),
	);

	const action: ReturnType<typeof signatureCacheGroupCreated> = yield take(
		signatureCacheGroupCreated.match,
	);

	const { background } = action.payload;

	yield put(
		setBoardProp({
			boardId,
			prop: "background",
			value: background,
		}),
	);
	yield put(boardBackgroundUpdated(payload));
}

export function* updateBoardBackgroundSaga() {
	yield takeEvery(updateBoardBackground.match, worker);
}
