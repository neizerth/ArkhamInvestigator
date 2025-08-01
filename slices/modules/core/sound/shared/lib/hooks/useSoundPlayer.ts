import { soundAssets } from "@assets/sounds";
import { useAppSelector } from "@shared/lib";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useEffect } from "react";
import { SOUND_VOLUME_MODIFIER } from "../../config";
import type { SoundId } from "../../model";
import { selectSoundEnabled, selectSoundVolume } from "../store";
import { useSoundPreload } from "./useSoundPreload";

export type UseSoundPlayerOptions = {
	id?: SoundId;
	preload?: boolean;
	onFinish?: () => void;
};

export const useSoundPlayer = (options: UseSoundPlayerOptions) => {
	const { id, onFinish } = options;
	const volume = useAppSelector(selectSoundVolume);
	const enabled = useAppSelector(selectSoundEnabled);
	const source = id && soundAssets[id];

	const player = useAudioPlayer(source);
	const { didJustFinish } = useAudioPlayerStatus(player);
	const playerVolume = volume * SOUND_VOLUME_MODIFIER;
	const preload = enabled && options.preload;

	player.volume = playerVolume;

	useEffect(() => {
		if (!didJustFinish) {
			return;
		}
		onFinish?.();
	}, [didJustFinish, onFinish]);

	useSoundPreload({
		player,
		preload,
	});

	return player;
};
