import {
	selectShowDescription,
	setShowDescription,
} from "@modules/board/base/shared/lib";
import { useAppDispatch, useAppSelector, useFadeAnimation } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./Overlay.components";

export type OverlayProps = ViewProps;

export const Overlay = (props: OverlayProps) => {
	const dispatch = useAppDispatch();
	const descriptionShown = useAppSelector(selectShowDescription);

	const style = useFadeAnimation({
		show: descriptionShown,
	});

	const onPress = useCallback(() => {
		dispatch(setShowDescription(false));
	}, [dispatch]);

	if (!descriptionShown) {
		return null;
	}

	return (
		<C.Container {...props} style={[props.style, style]}>
			<C.Area onPress={onPress} />
		</C.Container>
	);
};
