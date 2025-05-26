import { soundAssets } from "@assets/sounds";
import { delay, useAppSelector } from "@shared/lib";
import { Asset } from "expo-asset";
import { useAudioPlayer } from "expo-audio";
import { useEffect, useMemo } from "react";
import { SOUND_ENABLED, SOUND_VOLUME_MODIFIER } from "../../config";
import type { SoundId } from "../../model";
import { selectSoundEnabled, selectSoundVolume } from "../store";

export const useSoundPlayer = (id: SoundId = "switchTap") => {
	const volume = useAppSelector(selectSoundVolume);
	const enabled = useAppSelector(selectSoundEnabled);
	const source = useMemo(() => Asset.fromModule(soundAssets[id]).uri, [id]);

	const player = useAudioPlayer(source);
	const playerVolume = volume * SOUND_VOLUME_MODIFIER;

	// preload sound
	useEffect(() => {
		if (!SOUND_ENABLED || !enabled) {
			return;
		}
		player.volume = 0;
		player.play();

		const delayMs = player.duration * 1000;

		delay(delayMs).then(() => {
			player.volume = playerVolume;
		});
	}, [player, playerVolume, enabled]);

	return player;
};
