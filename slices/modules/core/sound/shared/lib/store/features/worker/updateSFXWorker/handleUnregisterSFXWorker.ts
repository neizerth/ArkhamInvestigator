import type {
	SFXWorkerData,
	SoundHandler,
} from "@modules/core/sound/shared/model";
import { whereId } from "@shared/lib/util";

export type UpdateSFXWorkerPayload = {
	id: string;
	data: SFXWorkerData;
};

export const handleUpdateSFXWorker: SoundHandler<UpdateSFXWorkerPayload> = (
	state,
	payload,
) => {
	const workers = state.sfxWorkers || [];
	const { id, data } = payload;
	const index = workers.findIndex(whereId(id));

	state.sfxWorkers = workers.with(index, {
		...workers[index],
		...data,
	});
};
