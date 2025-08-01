import type { SoundId } from "./common";

export type SoundQueueItemStatus = "idle" | "playing" | "paused";

export type SoundQueueItem = {
	id: string;
	workerId: string;
	soundId: SoundId;
	status: SoundQueueItemStatus;
};
