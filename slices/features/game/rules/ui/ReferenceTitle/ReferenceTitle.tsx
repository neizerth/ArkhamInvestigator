import { StyleSheet, type TextProps, type ViewProps } from "react-native";

import { color, font } from "@shared/config";
import { useAppSelector } from "@shared/lib";
import { selectCurrentLanguage } from "../../../../i18n";
import { getReferenceStyle } from "./ReferenceStyle.style";
import * as C from "./ReferenceTitle.components";

export type ReferenceTitleProps = TextProps & {
	contentContainerStyle?: ViewProps["style"];
	underlineStyle?: ViewProps["style"];
	lineStyle?: ViewProps["style"];
};

export const ReferenceTitle = ({
	contentContainerStyle,
	underlineStyle,
	lineStyle,
	...props
}: ReferenceTitleProps) => {
	const language = useAppSelector(selectCurrentLanguage);

	const textStyle = StyleSheet.flatten(props.style);

	const fontSize = textStyle.fontSize ?? font.size.xl;
	const backgroundColor = textStyle.color ?? color.text;

	const styles = getReferenceStyle({
		fontSize,
		language,
	});

	const defaultLineStyle = {
		backgroundColor,
	};

	return (
		<C.Container style={[contentContainerStyle]}>
			<C.Title {...props} />
			<C.UnderlineGroup style={[styles.underline, underlineStyle]}>
				<C.Underline style={[defaultLineStyle, lineStyle]} />
				<C.Underline style={[defaultLineStyle, lineStyle]} />
			</C.UnderlineGroup>
		</C.Container>
	);
};
