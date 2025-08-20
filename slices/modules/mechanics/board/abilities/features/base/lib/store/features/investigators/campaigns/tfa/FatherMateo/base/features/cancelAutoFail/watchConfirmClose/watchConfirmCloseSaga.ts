import { createReturnToChaosTokenRevealModalSaga } from "@modules/chaos-bag/reveal/modal/entities/lib";

import { cancelAutoFailModalId } from "../../../config";

export const FatherMateoWatchConfirmCloseSaga =
	createReturnToChaosTokenRevealModalSaga({
		modalId: cancelAutoFailModalId,
		name: "FatherMateoWatchConfirmCloseSaga",
	});
