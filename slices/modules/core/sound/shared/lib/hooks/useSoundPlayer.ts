import { soundAssets } from "@assets/sounds";
import { useAppSelector } from "@shared/lib";
import { useAudioPlayer } from "expo-audio";
import { useEffect } from "react";
import { SOUND_ENABLED, SOUND_VOLUME_MODIFIER } from "../../config";
import type { SoundId } from "../../model";
import { selectSoundEnabled, selectSoundVolume } from "../store";

export const useSoundPlayer = (id: SoundId = "switchTap") => {
	const volume = useAppSelector(selectSoundVolume);
	const enabled = useAppSelector(selectSoundEnabled);
	const source = soundAssets[id];

	const player = useAudioPlayer(source);
	const playerVolume = volume * SOUND_VOLUME_MODIFIER;

	player.volume = playerVolume;

	// preload sound
	useEffect(() => {
		if (!SOUND_ENABLED || !enabled) {
			return;
		}
		player.play();
		player.pause();
		player.seekTo(0);
	}, [player, enabled]);

	return player;
};
