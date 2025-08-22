import { createReturnToChaosTokenRevealModalSaga } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { modalId } from "../config";

export const ParallelAgnesBakerReturnToRevealModalSaga =
	createReturnToChaosTokenRevealModalSaga({
		modalId,
		name: "ParallelAgnesBakerReturnToRevealModalSaga",
	});
