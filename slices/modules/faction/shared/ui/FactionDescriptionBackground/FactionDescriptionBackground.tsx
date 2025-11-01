import { descriptionImages } from "@assets/images/game/description";
import { ImageBackground, type ImageBackgroundProps } from "@shared/ui";
import type { PropsWithFaction } from "../../model";

export type FactionDescriptionBackgroundProps = ImageBackgroundProps &
	PropsWithFaction;

export const FactionDescriptionBackground = ({
	faction,
	source: sourceProp,
	...props
}: FactionDescriptionBackgroundProps) => {
	const background = descriptionImages[faction];
	const source = sourceProp ?? background;

	return <ImageBackground {...props} source={source} />;
};
