import { titleImages } from "@assets/images/game/title";
import { getFactionImage } from "@shared/lib";
import { ImageBackground, type ImageBackgroundProps } from "@shared/ui";
import type { PropsWithFaction } from "../../model";

export type FactionTitleBackgroundProps = ImageBackgroundProps &
	PropsWithFaction & {
		parallel?: boolean;
	};

export const FactionTitleBackground = ({
	faction,
	parallel = false,
	source,
	...props
}: FactionTitleBackgroundProps) => {
	const background = getFactionImage({
		images: titleImages,
		faction,
		parallel,
	});

	return <ImageBackground {...props} source={source ?? background} />;
};
