import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import { selectBoardId } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { updateChaosToken } from "@modules/chaos-bag/base/entities/lib";
import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";
import { sealBlessOnBoard } from "./sealBlessOnBoard";

function* worker({ payload }: ReturnType<typeof sealBlessOnBoard>) {
	const { boardId, targetBoardId } = payload;
	const contents: ReturnType<typeof selectChaosBagContents> = yield select(
		selectChaosBagContents,
	);

	const bless = contents.find(
		({ type, sealed }) => type === "bless" && !sealed,
	);

	if (!bless) {
		return;
	}

	yield put(
		updateChaosToken({
			id: bless.id,
			data: {
				sealed: true,
				sealData: {
					type: "investigator",
					boardId: targetBoardId,
				},
			},
		}),
	);

	const sourceBoardIdSelector = selectBoardId(boardId);
	const sourceBoardId: ReturnType<typeof sourceBoardIdSelector> = yield select(
		sourceBoardIdSelector,
	);

	yield put(
		setBoardAbilityUse({
			boardId,
			abilityId: AbilityCode.FatherMateo.parallel,
			canUse: false,
			force: true,
		}),
	);

	const sameBoard = sourceBoardId === targetBoardId;

	if (sameBoard) {
		yield put(
			sendInvestigatorNotification({
				boardId,
				message: "ability.fatherMateo.parallel.sealBless.self",
			}),
		);
		return;
	}

	yield put(
		sendInvestigatorNotification({
			sourceBoardId,
			boardId: targetBoardId,
			message: "ability.fatherMateo.parallel.sealBless",
		}),
	);
}

export function* ParallelFatherMateoSealBlessOnBoardSaga() {
	yield takeEvery(sealBlessOnBoard.match, worker);
}
