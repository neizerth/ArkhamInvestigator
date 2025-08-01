import { SoundReducer } from "@modules/core/sound/shared/model";
import {
	handleRegisterSFXWorker,
	HandleRegisterSFXWorkerPayload,
} from "./handleRegisterSFXWorker";

export const registerSFXWorkerReducer: SoundReducer<
	HandleRegisterSFXWorkerPayload
> = (state, { payload }) => {
	handleRegisterSFXWorker(state, payload);
};
