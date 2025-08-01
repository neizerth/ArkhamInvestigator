import type { SoundId } from "./common";

export type SFXWorkerInfo = SFXWorkerData & {
	id: string;
};

export type SFXWorkerData =
	| {
			status: "idle";
	  }
	| {
			status: "playing" | "paused";
			soundId: SoundId;
	  };
