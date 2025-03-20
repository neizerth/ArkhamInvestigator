import parse from "html-react-parser";
import type { TextProps, ViewStyle } from "react-native";
import { getLibrary } from "../../lib";
import { prepareText } from "../../lib/prepareText";
import type { ComponentStyleMap } from "../../model";
import * as C from "./GameText.components";
import { defaultComponentStyles } from "./GameText.styles";

export type GameTextProps = TextProps & {
	value: string;
	componentStyles?: ComponentStyleMap;
	contentContainerStyle?: ViewStyle;
};

export { defaultComponentStyles as defaultGameTextComponentStyles };

export const GameText = ({
	value,
	componentStyles = defaultComponentStyles,
	contentContainerStyle,
	...props
}: GameTextProps) => {
	const text = prepareText(value);

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

	return <C.Container {...contentContainerStyle}>{children}</C.Container>;
};
