import {
	selectSoundEnabled,
	selectSoundVolume,
	setSoundEnabled,
	setSoundVolume,
} from "@features/sound";
import { SOUND_VOLUME_BARS_COUNT } from "@features/sound/config";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./SoundSettings.components";

export type SoundSettingsProps = ViewProps;

export const SoundSettings = (props: SoundSettingsProps) => {
	const enabled = useAppSelector(selectSoundEnabled);
	return (
		<C.Container {...props}>
			<C.Row>
				<C.Checkbox
					label="settings.sound"
					selector={selectSoundEnabled}
					actionCreator={setSoundEnabled}
				/>
			</C.Row>
			{enabled && (
				<C.Row>
					<C.Slider
						label="Volume"
						minimumValue={0}
						maximumValue={SOUND_VOLUME_BARS_COUNT}
						step={1}
						selector={selectSoundVolume}
						actionCreator={setSoundVolume}
					/>
				</C.Row>
			)}
		</C.Container>
	);
};
