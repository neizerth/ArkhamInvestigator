import {
	defaultFactionBackgroundImage,
	factionBackgroundImages,
} from "@assets/images/game/faction/background";
import { Image, type ImageProps } from "react-native";
import type { PropsWithFaction } from "../../model";

export type FactionBackgroundProps = ImageProps &
	PropsWithFaction & {
		enabled?: boolean;
	};

export const FactionBackground = ({
	faction,
	enabled = true,
	...props
}: FactionBackgroundProps) => {
	const background = factionBackgroundImages[faction];

	const source = enabled ? background : defaultFactionBackgroundImage;

	return <Image {...props} source={source} />;
};
