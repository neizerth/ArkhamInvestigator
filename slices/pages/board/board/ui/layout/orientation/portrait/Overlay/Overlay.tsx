import { useHapticFeedback } from "@features/haptic";
import {
	selectShowDescription,
	setShowDescription,
	useAppDispatch,
	useAppSelector,
	useFadeAnimation,
} from "@shared/lib";
import { useCallback } from "react";
import { StyleSheet, type ViewProps } from "react-native";
import * as C from "./Overlay.components";

export type OverlayProps = ViewProps;

export const Overlay = (props: OverlayProps) => {
	const dispatch = useAppDispatch();
	const descriptionShown = useAppSelector(selectShowDescription);
	const impactShowFeedback = useHapticFeedback("clockTick");

	const style = useFadeAnimation({
		show: descriptionShown,
	});

	const hideDescription = useCallback(() => {
		impactShowFeedback();
		dispatch(setShowDescription(false));
	}, [dispatch, impactShowFeedback]);

	if (!descriptionShown) {
		return null;
	}
	return (
		<C.Container {...props} style={[props.style, style]}>
			{descriptionShown && (
				<C.Area style={StyleSheet.absoluteFill} onPress={hideDescription} />
			)}
		</C.Container>
	);
};
