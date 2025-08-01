import type { AudioPlayer } from "expo-audio";
import { useEffect } from "react";
import { SOUND_ENABLED } from "../../config";

type Options = {
	player: AudioPlayer;
	preload?: boolean;
};

export const useSoundPreload = ({ player, preload }: Options) => {
	useEffect(() => {
		if (!SOUND_ENABLED || !preload) {
			return;
		}
		player.play();
		player.pause();
		player.seekTo(0);
	}, [player, preload]);
};
