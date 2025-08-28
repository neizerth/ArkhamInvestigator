import { soundAssets } from "@assets/sounds";
import { delay } from "@shared/lib";
import { createAudioPlayer } from "expo-audio";
import type { SoundId } from "../../model";

type Options = {
	soundId: SoundId;
	volume: number;
};

export const playSoundById = async ({ soundId, volume }: Options) => {
	const source = soundAssets[soundId];

	const player = createAudioPlayer(source);
	player.addListener("playbackStatusUpdate", ({ didJustFinish }) => {
		if (!didJustFinish) {
			return;
		}
		player.removeAllListeners("playbackStatusUpdate");
		player.release();
	});
	player.volume = volume;

	await player.seekTo(0);

	const duration = player.duration * 1000;
	player.play();

	await delay(duration);
};
