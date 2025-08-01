import { SoundReducer } from "@modules/core/sound/shared/model";
import {
	handleUnregisterSFXWorker,
	HandleUnregisterSFXWorkerPayload,
} from "./handleUnregisterSFXWorker";

export const unregisterSFXWorkerReducer: SoundReducer<
	HandleUnregisterSFXWorkerPayload
> = (state, { payload }) => {
	handleUnregisterSFXWorker(state, payload);
};
