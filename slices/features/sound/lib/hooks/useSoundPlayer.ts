import { soundAssets } from "@assets/sounds";
import { useAppSelector } from "@shared/lib";
import { useAudioPlayer } from "expo-audio";
import { useMemo } from "react";
import type { SoundId } from "../../model";
import { selectSoundVolume } from "../store";

export const useSoundPlayer = (id: SoundId = "switchTap") => {
	const volume = useAppSelector(selectSoundVolume);
	const source = useMemo(() => soundAssets[id], [id]);

	const player = useAudioPlayer(source);
	player.volume = volume / 1000;

	return player;
};
