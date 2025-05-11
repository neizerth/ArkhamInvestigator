import { soundAssets } from "@assets/sounds";
import { delay, useAppSelector } from "@shared/lib";
import { useAudioPlayer } from "expo-audio";
import { useEffect, useMemo } from "react";
import type { SoundId } from "../../model";
import { selectSoundVolume } from "../store";

export const useSoundPlayer = (id: SoundId = "switchTap") => {
	const volume = useAppSelector(selectSoundVolume);
	const source = useMemo(() => soundAssets[id], [id]);

	const player = useAudioPlayer(source);
	const playerVolume = volume / 1000;

	// preload sound
	useEffect(() => {
		player.volume = 0;
		player.play();

		const delayMs = player.duration * 1000;

		delay(delayMs).then(() => {
			player.volume = playerVolume;
		});
	}, [player, playerVolume]);

	return player;
};
