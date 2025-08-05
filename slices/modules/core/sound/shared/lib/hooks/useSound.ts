import { delay, useAppSelector } from "@shared/lib";
import { useCallback } from "react";
import { SOUND_ENABLED } from "../../config";
import { selectSoundEnabled } from "../store";
import { type UseSoundPlayerOptions, useSoundPlayer } from "./useSoundPlayer";

export type UseSoundOptions = UseSoundPlayerOptions & {
	onFinish?: () => void;
};

export const useSound = ({ onFinish, ...options }: UseSoundOptions) => {
	const soundEnabled = useAppSelector(selectSoundEnabled);

	const player = useSoundPlayer(options);

	return useCallback(
		async (enabled = true) => {
			if (!soundEnabled || !enabled || !SOUND_ENABLED) {
				return;
			}
			await player.seekTo(0);
			player.play();

			const duration = player.duration * 1000;
			await delay(duration);

			onFinish?.();
		},
		[player, soundEnabled, onFinish],
	);
};
