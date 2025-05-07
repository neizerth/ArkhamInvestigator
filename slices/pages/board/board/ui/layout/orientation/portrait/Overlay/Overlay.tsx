import {
	selectShowDescription,
	useAppSelector,
	useFadeAnimation,
} from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./Overlay.components";

export type OverlayProps = ViewProps;

export const Overlay = (props: OverlayProps) => {
	const descriptionShown = useAppSelector(selectShowDescription);

	const style = useFadeAnimation({
		show: descriptionShown,
	});

	if (!descriptionShown) {
		return null;
	}

	return <C.Container {...props} style={[props.style, style]} />;
};
