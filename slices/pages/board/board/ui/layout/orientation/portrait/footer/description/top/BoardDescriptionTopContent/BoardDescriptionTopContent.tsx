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
import Animated from "react-native-reanimated";
import * as C from "./BoardDescriptionTopContent.components";

export type BoardDescriptionTopContentProps = ViewProps;

export const BoardDescriptionTopContent = (
	props: BoardDescriptionTopContentProps,
) => {
	const dispatch = useAppDispatch();
	const descriptionShown = useAppSelector(selectShowDescription);

	const { mounted, fadeStyle, pointerEvents } = useMountedFadeAnimation({
		show: descriptionShown,
		duration: 300,
	});

	const hideDescription = useCallback(() => {
		dispatch(setShowDescription(false));
	}, [dispatch]);

	return (
		<C.Container {...props} style={[props.style]}>
			{mounted && (
				<Animated.View style={fadeStyle} pointerEvents={pointerEvents}>
					<C.ExpandArea onPress={hideDescription} />
					<C.Secondary />
					<C.TopMenu />
				</Animated.View>
			)}
		</C.Container>
	);
};
