import type { SoundReducer } from "@modules/core/sound/shared/model";
import {
	type UpdateSFXWorkerPayload,
	handleUpdateSFXWorker,
} from "./handleUnregisterSFXWorker";

export const updateSFXWorkerReducer: SoundReducer<UpdateSFXWorkerPayload> = (
	state,
	{ payload },
) => {
	handleUpdateSFXWorker(state, payload);
};
