import { factionIconImages } from "@assets/images/game/faction/icon";
import type { PropsWithFaction } from "@shared/model";
import FastImage, { type FastImageProps } from "react-native-fast-image";

type OmitedImageProps = "resizeMode" | "resizeMethod" | "source";

export type FactionIconImageProps = Omit<FastImageProps, OmitedImageProps> &
	PropsWithFaction;
export const FactionIconImage = ({
	faction,
	...props
}: FactionIconImageProps) => {
	const source = factionIconImages[faction];
	if (!source) {
		return null;
	}

	return <FastImage {...props} resizeMode="contain" source={source} />;
};
