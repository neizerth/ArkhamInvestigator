import { useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import { SOUND_ENABLED } from "../../config";
import { selectSoundEnabled } from "../store";
import { type UseSoundPlayerOptions, useSoundPlayer } from "./useSoundPlayer";

export const useSound = (options: UseSoundPlayerOptions) => {
	const soundEnabled = useAppSelector(selectSoundEnabled);

	const player = useSoundPlayer(options);

	return useCallback(
		async (enabled = true) => {
			if (!soundEnabled || !enabled || !SOUND_ENABLED) {
				return;
			}
			await player.seekTo(0);
			player.play();
		},
		[player, soundEnabled],
	);
};
