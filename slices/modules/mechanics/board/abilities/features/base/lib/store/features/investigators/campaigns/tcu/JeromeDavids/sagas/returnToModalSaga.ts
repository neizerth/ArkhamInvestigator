import { createReturnToChaosTokenRevealModalSaga } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { modalId } from "../config";

export const JeromeDavidsReturnToModalSaga =
	createReturnToChaosTokenRevealModalSaga({
		modalId,
		name: "JeromeDavidsReturnToModalSaga",
	});
