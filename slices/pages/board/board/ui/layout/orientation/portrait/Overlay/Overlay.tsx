import {
	selectShowDescription,
	setShowDescription,
} from "@modules/board/base/shared/lib";
import {
	useAppDispatch,
	useAppSelector,
	useMountedFadeAnimation,
} from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./Overlay.components";

export type OverlayProps = ViewProps;

export const Overlay = (props: OverlayProps) => {
	const dispatch = useAppDispatch();
	const descriptionShown = useAppSelector(selectShowDescription);

	const { mounted, fadeStyle, pointerEvents } = useMountedFadeAnimation({
		show: descriptionShown,
		duration: 300,
	});

	const onPress = useCallback(() => {
		dispatch(setShowDescription(false));
	}, [dispatch]);

	if (!mounted) {
		return null;
	}

	return (
		<C.Container
			{...props}
			style={[props.style, fadeStyle]}
			pointerEvents={pointerEvents}
		>
			<C.Area onPress={onPress} />
		</C.Container>
	);
};
