import type { TextProps, ViewProps } from "react-native";
import { color } from "../../../config";
import * as C from "./Section.components";

export type SectionProps = ViewProps & {
	title: string;
	titleStyle?: TextProps["style"];
	icon?: string;
	iconStyle?: TextProps["style"];
	headerStyle?: ViewProps["style"];
	bodyStyle?: ViewProps["style"];
	color?: string;
};

const DEFAULT_COLOR = color.dark20;

export const Section = ({
	title,
	titleStyle,
	icon,
	iconStyle,
	headerStyle,
	bodyStyle,
	color = DEFAULT_COLOR,
	children,
	...props
}: SectionProps) => {
	return (
		<C.Container {...props} color={color}>
			<C.Header style={headerStyle} color={color}>
				{icon && <C.SectionIcon icon={icon} style={iconStyle} />}
				<C.Title>{title}</C.Title>
			</C.Header>
			<C.Body style={bodyStyle}>{children}</C.Body>
		</C.Container>
	);
};
