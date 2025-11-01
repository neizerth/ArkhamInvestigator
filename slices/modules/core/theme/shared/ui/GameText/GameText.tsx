import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ArkhamDBTextProps } from "@shared/ui";
import { ArkhamDBText } from "@shared/ui";

export type GameTextProps = Omit<ArkhamDBTextProps, "replaceIcons">;

export const GameText = (props: GameTextProps) => {
	const artworksEnabled = useAppSelector(selectArtworksEnabled);
	return <ArkhamDBText {...props} replaceIcons={artworksEnabled} />;
};
