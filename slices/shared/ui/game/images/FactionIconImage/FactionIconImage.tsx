import type { PropsWithFaction } from "@shared/model/ui";
import type { ImageProps } from "react-native";
import { Image } from "react-native";
import { factionImages } from "./images";

type OmitedImageProps = "resizeMode" | "resizeMethod" | "source";

export type FactionIconImageProps = Omit<ImageProps, OmitedImageProps> &
	PropsWithFaction;
export const FactionIconImage = ({
	faction,
	...props
}: FactionIconImageProps) => {
	const source = factionImages[faction];
	if (!source) {
		return null;
	}

	return (
		<Image
			{...props}
			resizeMode="contain"
			resizeMethod="resize"
			source={source}
		/>
	);
};
