import { useHapticFeedback } from "@features/haptic";
import {
	selectShowDescription,
	setShowAdditionalInformation,
	setShowDescription,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { useCallback } from "react";
import { StyleSheet, type ViewProps } from "react-native";
import * as C from "./Overlay.components";
import { useOverlayStyle } from "./useOverlayStyle";

export type OverlayProps = ViewProps;

export const Overlay = (props: OverlayProps) => {
	const dispatch = useAppDispatch();
	const showDescription = useAppSelector(selectShowDescription);
	const impactShowFeedback = useHapticFeedback("clockTick");

	const style = useOverlayStyle();

	const hideDescription = useCallback(() => {
		impactShowFeedback();
		dispatch(setShowDescription(false));
	}, [dispatch, impactShowFeedback]);

	const setDisplayInfo = useCallback(
		(show: boolean) => () => {
			if (showDescription) {
				return;
			}
			if (show) {
				impactShowFeedback();
			}
			dispatch(setShowAdditionalInformation(show));
		},
		[dispatch, showDescription, impactShowFeedback],
	);

	return (
		<C.Container {...props} style={[props.style, style]}>
			<C.Area
				style={StyleSheet.absoluteFill}
				onPress={hideDescription}
				onPressIn={setDisplayInfo(true)}
				onPressOut={setDisplayInfo(false)}
			/>
		</C.Container>
	);
};
