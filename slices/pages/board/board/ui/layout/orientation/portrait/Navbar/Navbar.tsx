import { selectShowDescription } from "@modules/board/base/shared/lib";
import { selectNavigationMode } from "@modules/core/device/shared/lib";
import { useAppSelector, useFadeAnimation } from "@shared/lib";
import type { StyleProp, ViewProps, ViewStyle } from "react-native";
import * as C from "./Navbar.components";

export type NavbarProps = ViewProps;

export const Navbar = (props: NavbarProps) => {
	const navigationMode = useAppSelector(selectNavigationMode);
	const showDescription = useAppSelector(selectShowDescription);

	if (navigationMode?.type === "gesture") {
		return null;
	}

	const style = useFadeAnimation({
		show: !showDescription,
		duration: 300,
		delay: 150,
	});

	return (
		<C.Container
			{...props}
			style={[props.style, style] as StyleProp<ViewStyle>}
		/>
	);
};
