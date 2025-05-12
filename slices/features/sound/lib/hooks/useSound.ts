import { useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import type { SoundId } from "../../model";
import { selectSoundEnabled } from "../store";
import { useSoundPlayer } from "./useSoundPlayer";

const SOUND_DISABLED = true;

export const useSound = (id?: SoundId) => {
	const soundEnabled = useAppSelector(selectSoundEnabled);

	const player = useSoundPlayer(id);

	return useCallback(
		(enabled = true) => {
			if (!soundEnabled || !enabled || SOUND_DISABLED) {
				return;
			}
			player.seekTo(0).then(() => {
				player.play();
			});
		},
		[player, soundEnabled],
	);
};
