import { useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import { SOUND_ENABLED } from "../../config";
import type { SoundId } from "../../model";
import { selectSoundEnabled } from "../store";
import { useSoundPlayer } from "./useSoundPlayer";

export const useSound = (id?: SoundId) => {
	const soundEnabled = useAppSelector(selectSoundEnabled);

	const player = useSoundPlayer(id);

	return useCallback(
		(enabled = true) => {
			if (!soundEnabled || !enabled || !SOUND_ENABLED) {
				return;
			}
			player.seekTo(0).then(() => {
				player.play();
			});
		},
		[player, soundEnabled],
	);
};
