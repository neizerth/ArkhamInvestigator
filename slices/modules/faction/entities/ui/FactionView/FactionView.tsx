import type { ThemeFactionFontIconProps } from "@modules/core/theme/shared/ui";
import { pick } from "ramda";
import type { ViewProps } from "react-native";
import * as C from "./FactionView.components";

export type FactionViewProps = ThemeFactionFontIconProps & {
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
