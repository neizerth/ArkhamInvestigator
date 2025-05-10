import { useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { SoundId } from "../../model";
import { selectSoundEnabled } from "../store";
import { useSoundPlayer } from "./useSoundPlayer";

export const useSound = (id?: SoundId) => {
	const soundEnabled = useAppSelector(selectSoundEnabled);

	const player = useSoundPlayer(id);

	return useCallback(
		(enabled = true) => {
			if (!soundEnabled || !enabled) {
				return;
			}
			if (player.currentTime !== 0) {
				player.seekTo(0);
			}

			player.play();
		},
		[player, soundEnabled],
	);
};
