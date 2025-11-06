import { createReturnToChaosTokenRevealModalSaga } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { elderSignModalId } from "../config";

export const ParallelFatherMateoReturnToRevealModalSaga =
	createReturnToChaosTokenRevealModalSaga({
		modalId: elderSignModalId,
		name: "ParallelFatherMateoReturnToRevealModalSaga",
	});
