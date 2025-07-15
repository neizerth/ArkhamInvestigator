import { selectRevealedTokensCount } from "@modules/chaos-bag/reveal/base/shared/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { openModal } from "@modules/core/modal/shared/base/lib";
import { putResolve, select } from "redux-saga/effects";

export function* openModalIfPossible() {
	const count: ReturnType<typeof selectRevealedTokensCount> = yield select(
		selectRevealedTokensCount,
	);

	if (count === 0) {
		return;
	}

	yield putResolve(
		openModal({
			id: CustomModalId.chaosTokenReveal,
		}),
	);
}
