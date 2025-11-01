import parse from "html-react-parser";
import type { TextProps, ViewStyle } from "react-native";
import { getLibrary } from "../../lib";
import { prepareText } from "../../lib/prepareText";
import type { ComponentStyleMap } from "../../model";
import * as C from "./ArkhamDBText.components";
import { defaultComponentStyles } from "./ArkhamDBText.styles";

export type ArkhamDBTextProps = TextProps & {
	value: string;
	componentStyles?: ComponentStyleMap;
	contentContainerStyle?: ViewStyle;
	replaceBulletIcon?: boolean;
	replaceIcons?: boolean;
};

export { defaultComponentStyles as defaultGameTextComponentStyles };

export const ArkhamDBText = ({
	value,
	componentStyles = defaultComponentStyles,
	contentContainerStyle,
	replaceIcons,
	...props
}: ArkhamDBTextProps) => {
	const text = prepareText({
		...props,
		text: value,
		replaceIcons,
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
