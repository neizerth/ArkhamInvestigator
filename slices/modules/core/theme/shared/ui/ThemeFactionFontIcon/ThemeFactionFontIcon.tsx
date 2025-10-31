import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import type { FactionIconType } from "@modules/faction/shared/model";
import {
	FactionFontIcon,
	type FactionFontIconProps,
} from "@modules/faction/shared/ui/icons/FactionFontIcon";
import { useAppSelector } from "@shared/lib";

export type ThemeFactionFontIconProps = Omit<FactionFontIconProps, "type">;

export const ThemeFactionFontIcon = (props: ThemeFactionFontIconProps) => {
	const artworksEnabled = useAppSelector(selectArtworksEnabled);

	const type: FactionIconType = artworksEnabled ? "default" : "alt";
	return <FactionFontIcon {...props} type={type} />;
};
