import { pick } from "ramda";
import type { ViewProps } from "react-native";
import type { FactionFontIconProps } from "../FactionFontIcon";
import * as C from "./FactionView.components";

export type FactionViewProps = FactionFontIconProps & {
	contentContainerStyle?: ViewProps["style"];
	selected?: boolean;
};

export const FactionView = ({
	contentContainerStyle,
	...props
}: FactionViewProps) => {
	const containerProps = pick(
		["faction", "colored", "light", "selected"],
		props,
	);
	return (
		<C.Container style={contentContainerStyle} {...containerProps}>
			<C.Icon {...props} />
		</C.Container>
	);
};
