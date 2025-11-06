import { createRevealedToken } from "@modules/chaos-bag/reveal/base/entities/lib";
import {
	addRevealedTokens,
	selectAvailableTokens,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/entities/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import {
	createConfirmModalFilter,
	type modalConfirmed,
} from "@modules/core/modal/shared/actions/confirm/lib";
import {
	closeModal,
	selectModalValue,
} from "@modules/core/modal/shared/base/lib";
import { propEq } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createConfirmModalFilter({
	modalId: CustomModalId.ParallelWendyAdams,
});

type DataPayload = {
	bless: number;
	curse: number;
	total: number;
};

function* worker({ payload }: ReturnType<typeof modalConfirmed>) {
	const { boardId } = payload;
	const data: DataPayload | null = yield select(selectModalValue);

	console.log("data", data);

	if (!data) {
		return;
	}

	if (data.total === 0) {
		return;
	}

	const valuesSelector = selectChaosBagTokenValues(boardId);
	const values: ReturnType<typeof valuesSelector> =
		yield select(valuesSelector);

	const availableTokens: ReturnType<typeof selectAvailableTokens> =
		yield select(selectAvailableTokens);

	const bless = availableTokens.filter(propEq("bless", "type"));
	const curse = availableTokens.filter(propEq("curse", "type"));

	const tokens = [...bless.slice(0, data.bless), ...curse.slice(0, data.curse)];

	const revealedTokens = tokens.map((token) =>
		createRevealedToken({
			...token,
			value: values[token.type],
			canceled: "effect",
		}),
	);

	yield put(
		addRevealedTokens({
			tokens: revealedTokens,
		}),
	);

	yield put(
		closeModal({
			source: "effect",
		}),
	);
}

export function* ParallelWendyAdamsProcessModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
