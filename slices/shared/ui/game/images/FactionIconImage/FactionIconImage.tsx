import { factionIconImages } from "@assets/images/game/faction/icon";
import type { PropsWithFaction } from "@shared/model";
import { Image, type ImageProps } from "react-native";

type OmitedImageProps = "resizeMode" | "resizeMethod" | "source";

export type FactionIconImageProps = Omit<ImageProps, OmitedImageProps> &
	PropsWithFaction;
export const FactionIconImage = ({
	faction,
	...props
}: FactionIconImageProps) => {
	const source = factionIconImages[faction];
	if (!source) {
		return null;
	}

	return <Image {...props} resizeMode="contain" source={source} />;
};
