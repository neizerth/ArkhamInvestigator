import { factionIconImages } from "@assets/images/game/faction/icon";
import type { PropsWithFaction } from "@shared/model";
import { Image, type ImageProps } from "expo-image";

export type FactionIconImageProps = Omit<ImageProps, "source"> &
	PropsWithFaction;
export const FactionIconImage = ({
	faction,
	...props
}: FactionIconImageProps) => {
	const source = factionIconImages[faction];

	return (
		<Image {...props} contentFit="contain" source={source} priority="high" />
	);
};
