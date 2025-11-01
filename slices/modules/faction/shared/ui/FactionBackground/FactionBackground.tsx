import { factionBackgroundImages } from "@assets/images/game/faction/background";
import { ImageBackground, type ImageBackgroundProps } from "@shared/ui";
import type { PropsWithFaction } from "../../model";

export type FactionBackgroundProps = ImageBackgroundProps & PropsWithFaction;

export const FactionBackground = ({
	faction,
	source: sourceProp,
	...props
}: FactionBackgroundProps) => {
	const background = factionBackgroundImages[faction];
	const source = sourceProp ?? background;

	return <ImageBackground {...props} source={source} />;
};
