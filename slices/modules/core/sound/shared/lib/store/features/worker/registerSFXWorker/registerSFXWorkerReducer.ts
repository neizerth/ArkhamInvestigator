import type { SoundReducer } from "@modules/core/sound/shared/model";
import {
	type HandleRegisterSFXWorkerPayload,
	handleRegisterSFXWorker,
} from "./handleRegisterSFXWorker";

export const registerSFXWorkerReducer: SoundReducer<
	HandleRegisterSFXWorkerPayload
> = (state, { payload }) => {
	handleRegisterSFXWorker(state, payload);
};
