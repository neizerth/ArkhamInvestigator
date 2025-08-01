import type { SoundReducer } from "@modules/core/sound/shared/model";
import {
	type HandleUnregisterSFXWorkerPayload,
	handleUnregisterSFXWorker,
} from "./handleUnregisterSFXWorker";

export const unregisterSFXWorkerReducer: SoundReducer<
	HandleUnregisterSFXWorkerPayload
> = (state, { payload }) => {
	handleUnregisterSFXWorker(state, payload);
};
