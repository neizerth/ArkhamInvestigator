import { createReturnToChaosTokenRevealModalSaga } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";

export const ParallelWendyAdamsReturnToModalSaga =
	createReturnToChaosTokenRevealModalSaga({
		modalId: CustomModalId.ParallelWendyAdams,
		name: "ParallelWendyAdamsReturnToModalSaga",
	});
