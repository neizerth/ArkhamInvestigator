import { createReturnToChaosTokenRevealModalSaga } from "@modules/chaos-bag/reveal/modal/entities/lib";
import { returnModalId } from "../config";

export const moonTokenReturnToRevealModalSaga =
	createReturnToChaosTokenRevealModalSaga({
		modalId: returnModalId,
		name: "moonTokenReturnToRevealModalSaga",
	});
