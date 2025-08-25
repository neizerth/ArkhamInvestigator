import { selectShowDescription } from "@modules/board/base/shared/lib";
import { useAppSelector, useFadeAnimation } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./Navbar.components";

export type NavbarProps = ViewProps;

export const Navbar = (props: NavbarProps) => {
	const showDescription = useAppSelector(selectShowDescription);

	const style = useFadeAnimation({
		show: !showDescription,
		duration: 150,
	});

	return <C.Container {...props} style={[props.style, style]} />;
};
