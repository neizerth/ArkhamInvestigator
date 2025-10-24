import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import parse from "html-react-parser";
import type { TextProps, ViewStyle } from "react-native";
import { useAppSelector } from "../../../../../lib";
import { getLibrary } from "../../lib";
import { prepareText } from "../../lib/prepareText";
import type { ComponentStyleMap } from "../../model";
import * as C from "./GameText.components";
import { defaultComponentStyles } from "./GameText.styles";

export type GameTextProps = TextProps & {
	value: string;
	componentStyles?: ComponentStyleMap;
	contentContainerStyle?: ViewStyle;
	replaceBulletIcon?: boolean;
};

export { defaultComponentStyles as defaultGameTextComponentStyles };

export const GameText = ({
	value,
	componentStyles = defaultComponentStyles,
	contentContainerStyle,
	...props
}: GameTextProps) => {
	const artworksEnabled = useAppSelector(selectArtworksEnabled);
	const text = prepareText({
		...props,
		text: value,
		replaceIcons: artworksEnabled,
	});

	const library = getLibrary({
		componentStyles: {
			...defaultComponentStyles,
			...componentStyles,
		},
		props,
	});
	const children = parse(text, {
		library,
	});

	return <C.Container style={contentContainerStyle}>{children}</C.Container>;
};
