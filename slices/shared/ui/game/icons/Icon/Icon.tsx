import type { IconScaleType, PropsWithStroke } from "@shared/model";
import { ArkhamIcons } from "../../../../../../assets/fonts";
import { getIconScale } from "../../../../lib/features/game/icons";
import { useAppSelector } from "../../../../lib/hooks/store/useAppSelector";
import { selectIcon } from "../../../../lib/store/features/icons";
import { scaleFontFromStyle } from "../../../../lib/ui";
import {
	UnscaledText,
	type UnscaledTextProps,
} from "../../../behavior/UnscaledText";

export type IconProps = UnscaledTextProps &
	PropsWithStroke & {
		icon: string;
		scaleType?: IconScaleType;
	};

export type DefinedIconProps = Omit<IconProps, "icon">;

export const Icon = ({ icon, style, scaleType, ...props }: IconProps) => {
	const item = useAppSelector(selectIcon(icon));

	if (!item) {
		// console.warn(`icon ${icon} not found`);
		return null;
	}

	const contents = String.fromCharCode(item.code);

	const scale = getIconScale(item, scaleType);

	const { scaledFontSize } = scaleFontFromStyle(scale, style);

	const fontSizeStyles = {
		fontFamily: ArkhamIcons.default,
		fontSize: scaledFontSize,
	};

	return (
		<UnscaledText {...props} style={[style, fontSizeStyles]}>
			{contents}
		</UnscaledText>
	);
};
