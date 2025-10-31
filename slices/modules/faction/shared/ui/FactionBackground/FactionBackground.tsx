import { factionBackgroundImages } from "@assets/images/game/faction/background";
import { Image, type ImageProps } from "react-native";
import type { PropsWithFaction } from "../../model";

export type FactionBackgroundProps = ImageProps & PropsWithFaction;

export const FactionBackground = ({
	faction,
	source,
	...props
}: FactionBackgroundProps) => {
	const background = factionBackgroundImages[faction];

	return <Image {...props} source={source ?? background} />;
};
