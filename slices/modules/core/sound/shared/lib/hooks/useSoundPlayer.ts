import { soundAssets } from "@assets/sounds";
import { useAppSelector } from "@shared/lib";
import { useAudioPlayer } from "expo-audio";
import { SOUND_VOLUME_MODIFIER } from "../../config";
import type { SoundId } from "../../model";
import { selectSoundEnabled, selectSoundVolume } from "../store";
import { useSoundPreload } from "./useSoundPreload";

export type UseSoundPlayerOptions = {
	id?: SoundId;
	preload?: boolean;
};

export const useSoundPlayer = (options: UseSoundPlayerOptions) => {
	const { id } = options;
	const volume = useAppSelector(selectSoundVolume);
	const enabled = useAppSelector(selectSoundEnabled);
	const source = id && soundAssets[id];

	const player = useAudioPlayer(source);
	const playerVolume = volume * SOUND_VOLUME_MODIFIER;
	const preload = enabled && options.preload;

	player.volume = playerVolume;

	useSoundPreload({
		player,
		preload,
	});

	return player;
};
