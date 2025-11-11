import { createReturnToChaosTokenRevealModalSaga } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { modalId } from "../config";

export const YukiYagamiReturnToModalSaga =
	createReturnToChaosTokenRevealModalSaga({
		modalId,
		name: "YukiYagamiReturnToModalSaga",
	});
