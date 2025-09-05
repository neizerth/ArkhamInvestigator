import { selectBoardsCount } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { PressableProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as C from "./AdditionalInfoArea.components";
import { usePressGestures, useSwipeGestures } from "./lib";

export type AdditionalInfoAreaProps = PressableProps & {
	swipe?: boolean;
};

export const AdditionalInfoArea = ({
	swipe = false,
	...props
}: AdditionalInfoAreaProps) => {
	const count = useAppSelector(selectBoardsCount);

	const swipeEnabled = swipe && count > 1;

	const swipeGestures = useSwipeGestures(swipeEnabled);
	const gesture = Gesture.Exclusive(...swipeGestures);

	const pressGestures = usePressGestures();

	return (
		<GestureDetector gesture={gesture}>
			<C.Container {...props} {...pressGestures} />
		</GestureDetector>
	);
};
