import * as C from "./IconNumber.components";
import type { IconNumberComponentProps } from "./IconNumber.types";

export const UnstrokedIconNumber = ({
	value,
	contentContainerStyle,
	...props
}: IconNumberComponentProps) => {
	return (
		<C.Container style={contentContainerStyle}>
			<C.UnstrokedText {...props}>{value}</C.UnstrokedText>
		</C.Container>
	);
};
